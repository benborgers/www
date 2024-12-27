import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import getPosts from "../lib/getPosts";

const md = MarkdownIt();

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts({ includeUnlisted: false });

  return rss({
    title: "Ben Borgers",
    description: "Ben Borgers’ personal website.",
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.slug}`,
      content: sanitizeHtml(md.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    trailingSlash: false,
  });
};
