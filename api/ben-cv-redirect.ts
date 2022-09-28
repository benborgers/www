export const config = { runtime: "experimental-edge" };

const BASE = "https://benborgers.com";

export default (req: Request) => {
  const params = new URL(req.url).searchParams;
  const path = params.get("path");

  if (path === null || path === "") {
    return Response.redirect(BASE);
  }

  new Response("hello from ben-cv-redirect! your path is " + path);
};
