// We can't use wsrv.nl directly, because they serve a robots.txt
// that blocks Twitter and other bots.

import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url, site, redirect }) => {
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response("Missing `url` query parameter", { status: 400 });
  }

  const imageUrl = `https://wsrv.nl/?url=${
    site!.origin
  }${path}&h=630&w=1200&fit=contain&cbg=white&output=jpg`;

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response("Failed to fetch image", { status: response.status });
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": response.headers.get("Content-Type")!,
      "Cache-Control": "public, max-age=3600", // Cache for an hour
    },
  });
};
