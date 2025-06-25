import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
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
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.slug}`,
      // content: replaceRelativeWithAbsoluteUrls(md.render(post.body)),
      content: post.rendered?.html,
    })),
    trailingSlash: false,
  });
};
