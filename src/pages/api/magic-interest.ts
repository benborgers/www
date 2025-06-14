export const prerender = false;

import { OPENAI_API_KEY } from "astro:env/server";

export const GET = async ({ request }: { request: Request }) => {
  // const city = request.headers.get("X-Vercel-IP-City");
  // const region = request.headers.get("X-Vercel-IP-Country-Region");
  // const country = request.headers.get("X-Vercel-IP-Country");

  // For local dev
  const city = "Lexington";
  const region = "MA";
  const country = "US";

  if (city === null || region === null || country === null) {
    return new Response("Missing location", { status: 500 });
  }

  const location = `${city}, ${region}, ${country}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      temperature: 1.5,
      input: `
You are a local of ${location}.
Give me a fun activity that you would do on your day off.
Don't make things up - only say something you're absolutely SURE is possible.

Requirements:
- Respond with one sentence only, in present progressive tense.
- Make it specific to the location, not generally applicable.
- Don't embellish - no yapping.
- Don't use superlatives like "vibrant", etc.
- Don't talk about art, murals, archives, etc.

<examples>
  <example>
    <location>Lexington, MA, US</location>
    <response>Walking along the Minuteman Bikeway.</response>
  </example>
  <example>
    <location>Somerville, MA, US</location>
    <response>Going to Diesel Cafe to do work.</response>
  </example>
  <example>
    <location>Berkeley, CA, US</location>
    <response>Buying orange juice at Monterey Market.</response>
  </example>
</examples>
      `.trim(),
    }),
  });

  const data = await response.json();
  return new Response(data.output[0].content[0].text);
};
