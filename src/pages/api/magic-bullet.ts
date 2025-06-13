export const prerender = false;

export const GET = async ({ request }: { request: Request }) => {
  const city = request.headers.get("X-Vercel-IP-City");
  const region = request.headers.get("X-Vercel-IP-Country-Region");
  const country = request.headers.get("X-Vercel-IP-Country");

  return new Response(`${city} ${region} ${country}`);
};
