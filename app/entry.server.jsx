import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import redirects from "~/data/redirects";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  // Redirects
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();
  let redirect;

  if (redirects[pathname]) {
    redirect = redirects[pathname];
  }

  if (pathname.startsWith("/blog")) {
    redirect = pathname.replace("/blog", "/posts");
  }

  if (pathname.endsWith("/") && pathname !== "/") {
    redirect = pathname.replace(/\/$/, "");
  }

  if (pathname === "/posts") {
    redirect = "/#posts";
  }

  if (redirect) {
    return new Response("", {
      status: 301,
      headers: { location: redirect },
    });
  }

  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
