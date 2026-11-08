import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import MarkdownIt from "markdown-it";
import { getPosts } from "../lib/posts";

const md = MarkdownIt({ html: true });

export const GET: APIRoute = async ({ site: _site }) => {
  const site = _site!;

  const posts = await getPosts({ includeUnlisted: false });

  const replaceRelativeWithAbsoluteUrls = (html: string) => {
    const ATTRIBUTES = ["src", "href"];

    for (const attribute of ATTRIBUTES) {
      html = html.replace(
        new RegExp(`${attribute}="([^"]+)"`, "g"),
        (match, p1) =>
          `${attribute}="${p1.startsWith("/") ? `${site.origin}${p1}` : p1}"`
      );
    }

    return html;
  };

  return rss({
    title: "Ben Borgers",
    description: "Ben Borgers’ personal website.",
    site,
    items: await Promise.all(
      posts.map(async (post) => {
        if (post.data.cover_image) {
          // Keeps building the hashed URLs that emails sent before /covers
          // existed still link to. Astro only emits the file once `src` is read.
          await getImage({
            src: post.data.cover_image,
            width: Math.min(post.data.cover_image.width, 1080),
            format: "jpg",
            quality: 90,
            background: "#fff",
          }).then((image) => image.src);
        }
        const coverImageHtml = post.data.cover_image
          ? `<img src="${site.origin}/covers/${post.id}.${post.data.cover_image.format}" alt="" />`
          : "";
        // Feed readers can't run a custom page, so send readers to it.
        const body =
          post.collection === "custom"
            ? `[View this on ben.page →](/${post.id})`
            : post.body;
        return {
          title: post.data.title,
          pubDate: post.data.date,
          link: `/${post.id}`,
          content:
            coverImageHtml +
            replaceRelativeWithAbsoluteUrls(md.render(body ?? "")),
        };
      })
    ),
    trailingSlash: false,
  });
};
