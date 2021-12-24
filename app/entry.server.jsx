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
  const { pathname, href } = new URL(request.url);
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

  // I'm not sure what the SEO implications of having the
  // same content on two domains is, so I'm redirecting.
  if (href.startsWith("https://ben.cv/")) {
    redirect = href.replace("https://ben.cv/", "https://benborgers.com/");
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
