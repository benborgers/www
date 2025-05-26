import type { APIRoute } from "astro";
import getPosts from "../lib/get-posts";

function escapeForXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;"; // Corrected single quote case
      case '"':
        return "&quot;"; // Corrected double quote case
      default:
        return c;
    }
  });
}

export const GET: APIRoute = async ({ site: _site }) => {
  const site = _site!;

  // Exclude technical posts (which are unlisted) to make the document less tokens.
  const posts = await getPosts({ includeUnlisted: false });

  const header = `
This page contains all blog posts from Ben Borgers’ personal website, ${site.origin}.
`.trim();

  const postStrings = posts.map((post) => {
    const title = post.data.title;
    const date = post.data.date.toISOString().split("T")[0]; // yyyy-mm-dd
    const link = `${site.origin}/${post.slug}`;

    const escapedTitle = escapeForXml(title);
    const escapedLink = escapeForXml(link);
    const escapedBody = escapeForXml(post.body);

    return `
<post>
  <title>${escapedTitle}</title>
  <date>${date}</date>
  <link>${escapedLink}</link>
  <body>
${escapedBody}
  </body>
</post>
`.trim();
  });

  // Ensure proper joining and structure
  const output = `${header}

<posts>
${postStrings.join("\n\n")}
</posts>`;

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
