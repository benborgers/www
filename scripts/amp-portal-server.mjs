import http from "node:http";
import net from "node:net";
import { spawn } from "node:child_process";

const publicUrl = parsePublicUrl(process.env.PUBLIC_URL);
const port = parsePort(process.env.PORT, "PORT");
const upstreamPort = await reservePort();
const localHosts = new Set([
  `localhost:${port}`,
  `127.0.0.1:${port}`,
  `[::1]:${port}`,
]);
let upstreamReady = false;
let stopping = false;

const astro = spawn(
  process.execPath,
  [
    "node_modules/astro/bin/astro.mjs",
    "dev",
    "--host",
    "127.0.0.1",
    "--port",
    String(upstreamPort),
  ],
  {
    env: {
      ...process.env,
      // Astro's schema requires the key at startup. The endpoint remains
      // intentionally unavailable unless a real orb secret is configured.
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || "orb-development-placeholder",
    },
    stdio: "inherit",
  },
);

astro.once("exit", (code, signal) => {
  if (!stopping) {
    console.error(`Astro exited unexpectedly (${signal ?? code}).`);
    process.exit(code || 1);
  }
});

const server = http.createServer((request, response) => {
  if (request.url === "/__amp/health") {
    response.writeHead(upstreamReady ? 200 : 503, {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
    });
    response.end(upstreamReady ? "ok\n" : "starting\n");
    return;
  }

  const validation = validateRequest(request);
  if (!validation.ok) {
    response.writeHead(validation.status, {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
    });
    response.end(`${validation.message}\n`);
    return;
  }

  if (request.method === "OPTIONS" && validation.corsOrigin) {
    response.writeHead(204, corsHeaders(request, validation.corsOrigin));
    response.end();
    return;
  }

  const headers = upstreamHeaders(request.headers, validation.normalizeCrossSiteCors);
  const upstreamRequest = http.request(
    {
      host: "127.0.0.1",
      port: upstreamPort,
      method: request.method,
      path: request.url,
      headers,
    },
    (upstreamResponse) => {
      const responseHeaders = { ...upstreamResponse.headers };
      if (responseHeaders.location) {
        responseHeaders.location = publicLocation(responseHeaders.location);
      }
      if (validation.corsOrigin) {
        Object.assign(responseHeaders, corsHeaders(request, validation.corsOrigin));
      }
      response.writeHead(upstreamResponse.statusCode ?? 502, responseHeaders);
      upstreamResponse.pipe(response);
    },
  );

  upstreamRequest.on("error", (error) => {
    if (!response.headersSent) {
      response.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    }
    response.end(`Portal upstream unavailable: ${error.code ?? "unknown error"}\n`);
  });
  request.pipe(upstreamRequest);
});

server.on("upgrade", (request, socket, head) => {
  const validation = validateRequest(request);
  if (!validation.ok) {
    socket.end(`HTTP/1.1 ${validation.status} Forbidden\r\nConnection: close\r\n\r\n`);
    return;
  }

  const upstreamSocket = net.connect(upstreamPort, "127.0.0.1", () => {
    const headers = upstreamHeaders(request.headers, validation.normalizeCrossSiteCors);
    const lines = [`${request.method} ${request.url} HTTP/${request.httpVersion}`];
    for (const [name, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        for (const item of value) lines.push(`${name}: ${item}`);
      } else if (value !== undefined) {
        lines.push(`${name}: ${value}`);
      }
    }
    upstreamSocket.write(`${lines.join("\r\n")}\r\n\r\n`);
    if (head.length) upstreamSocket.write(head);
    upstreamSocket.pipe(socket).pipe(upstreamSocket);
  });
  upstreamSocket.on("error", () => socket.destroy());
  socket.on("error", () => upstreamSocket.destroy());
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Amp portal listener ready on port ${port}; Astro uses ${upstreamPort}.`);
});

await waitForAstro();
upstreamReady = true;
console.log(`Astro is ready at ${publicUrl.origin}.`);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (stopping) return;
    stopping = true;
    server.close();
    astro.kill(signal);
  });
}

function parsePublicUrl(value) {
  if (!value) throw new Error("PUBLIC_URL is required for the portal service");
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("PUBLIC_URL must be a valid URL");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("PUBLIC_URL must be an HTTPS origin without credentials or a path");
  }
  return url;
}

function parsePort(value, name) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`${name} must be an integer from 1 through 65535`);
  }
  return parsed;
}

async function reservePort() {
  return await new Promise((resolve, reject) => {
    const reservation = net.createServer();
    reservation.once("error", reject);
    reservation.listen(0, "127.0.0.1", () => {
      const address = reservation.address();
      reservation.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

function validateRequest(request) {
  const host = request.headers.host;
  if (host !== publicUrl.host && !localHosts.has(host)) {
    return { ok: false, status: 421, message: "Unrecognized portal host" };
  }

  const isCrossSiteCors =
    request.headers["sec-fetch-site"] === "cross-site" &&
    request.headers["sec-fetch-mode"] === "cors";
  if (!isCrossSiteCors) return { ok: true };

  const origin = request.headers.origin;
  if (origin === undefined) {
    return { ok: true, normalizeCrossSiteCors: true };
  }
  if (!isTrustedOrigin(origin)) {
    return { ok: false, status: 403, message: "Cross-site Origin is not allowed" };
  }
  return { ok: true, corsOrigin: origin, normalizeCrossSiteCors: true };
}

function isTrustedOrigin(origin) {
  if (origin === "null") return false;
  let url;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.origin !== origin || url.protocol !== "https:") return false;
  return (
    url.origin === publicUrl.origin ||
    url.hostname === "ampcode.com" ||
    url.hostname.endsWith(".ampcode.com")
  );
}

function upstreamHeaders(incoming, normalizeCrossSiteCors) {
  const headers = { ...incoming };
  for (const name of [
    "forwarded",
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-port",
    "x-forwarded-proto",
  ]) {
    delete headers[name];
  }
  headers.host = publicUrl.host;
  headers["x-forwarded-host"] = publicUrl.host;
  headers["x-forwarded-port"] = "443";
  headers["x-forwarded-proto"] = "https";
  if (normalizeCrossSiteCors) delete headers["sec-fetch-site"];
  return headers;
}

function corsHeaders(request, origin) {
  const requestedHeaders = request.headers["access-control-request-headers"];
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, HEAD, OPTIONS",
    ...(requestedHeaders ? { "access-control-allow-headers": requestedHeaders } : {}),
    vary: "Origin",
  };
}

function publicLocation(location) {
  if (location.startsWith("/") && !location.startsWith("//")) return location;
  let url;
  try {
    url = new URL(location, publicUrl);
  } catch {
    return location;
  }
  const internalHost =
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname === "::1" ||
    url.hostname === "[::1]" ||
    url.hostname.endsWith(".e2b.app") ||
    url.hostname === publicUrl.hostname;
  if (!internalHost) return location;
  return new URL(`${url.pathname}${url.search}${url.hash}`, publicUrl).href;
}

async function waitForAstro() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (astro.exitCode !== null) throw new Error("Astro exited before becoming ready");
    try {
      const status = await new Promise((resolve, reject) => {
        const request = http.get(
          {
            host: "127.0.0.1",
            port: upstreamPort,
            path: "/",
            headers: { host: publicUrl.host },
          },
          (response) => {
            response.resume();
            resolve(response.statusCode);
          },
        );
        request.setTimeout(1_000, () => request.destroy());
        request.on("error", reject);
      });
      if (status < 500) return;
    } catch {
      // Astro is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Astro did not become ready within 60 seconds");
}
