// 2022-09-28
// Historically, when I switched ben.cv from being its own website to having
// my blog posts on benborgers.com, I redirected ben.cv/* to
// benborgers.com/posts/*.
// Today, I wanted to add a ben.cv/newsletter redirect.
// So I set up this edge function to be able to add arbitrary redirects
// (defined as REDIRECTS). But it still falls back to benborgers.com/posts/*
// to preserve the old behavior.
// The only change is that ben.cv now redirects to benborgers.com instead of
// benborgers.com/posts, which I think makes sense given that I don’t write
// daily blog posts anymore.

export const config = { runtime: "experimental-edge" };

const BASE = "https://benborgers.com";

const REDIRECTS: Record<string, string> = {
  newsletter: `${BASE}/#newsletter`,
};

export default (req: Request) => {
  const params = new URL(req.url).searchParams;
  const path = params.get("path");

  if (path === null || path === "") {
    return Response.redirect(`${BASE}`);
  }

  if (REDIRECTS[path]) {
    return Response.redirect(REDIRECTS[path]);
  }

  return Response.redirect(`${BASE}/posts/${path}`);
};
