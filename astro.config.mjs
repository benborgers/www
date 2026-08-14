// @ts-check
import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

const portalUrl = process.env.PUBLIC_URL
  ? new URL(process.env.PUBLIC_URL)
  : undefined;

function ampOrbPortalPlugin() {
  return {
    name: "amp-orb-portal",
    enforce: "post",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({
          route: "",
          handle(request, response, next) {
            if (
              request.headers["sec-fetch-site"] !== "cross-site" ||
              request.headers["sec-fetch-mode"] !== "cors"
            ) {
              next();
              return;
            }

            const origin = request.headers.origin;
            if (origin === undefined) {
              delete request.headers["sec-fetch-site"];
              next();
              return;
            }
            if (!isTrustedPortalOrigin(origin)) {
              response.writeHead(403, {
                "cache-control": "no-store",
                "content-type": "text/plain; charset=utf-8",
              });
              response.end("Cross-site Origin is not allowed\n");
              return;
            }

            delete request.headers["sec-fetch-site"];
            next();
          },
        });
      };
    },
  };
}

function isTrustedPortalOrigin(origin) {
  if (!portalUrl || origin === "null") return false;
  let url;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.origin !== origin || url.protocol !== "https:") return false;
  return (
    url.origin === portalUrl.origin ||
    url.hostname === "ampcode.com" ||
    url.hostname.endsWith(".ampcode.com")
  );
}

export default defineConfig({
  site: "https://ben.page",
  integrations: [sitemap()],
  adapter: vercel(),
  trailingSlash: "never",

  security: portalUrl
    ? {
        allowedDomains: [
          { protocol: portalUrl.protocol.slice(0, -1), hostname: portalUrl.hostname },
        ],
      }
    : undefined,

  vite: {
    plugins: [
      tailwindcss(),
      ...(portalUrl ? [ampOrbPortalPlugin()] : []),
    ],
    server: portalUrl
      ? {
          allowedHosts: [portalUrl.hostname, ".e2b.app", ".onamp.dev"],
          cors: {
            origin: [portalUrl.origin, /^https:\/\/([a-z0-9-]+\.)*ampcode\.com$/],
          },
        }
      : undefined,
  },

  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },

  devToolbar: {
    enabled: false,
  },

  env: {
    schema: {
      OPENAI_API_KEY: envField.string({ context: 'server', access: 'secret', })
    }
  }
});
