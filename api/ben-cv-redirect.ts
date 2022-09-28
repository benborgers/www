export const config = { runtime: "experimental-edge" };

const BASE = "https://benborgers.com";

const REDIRECTS: Record<string, string> = {
  newsletter: `${BASE}/?newsletter`,
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
