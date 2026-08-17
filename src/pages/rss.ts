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
        const coverImage = post.data.cover_image
          ? await getImage({
              src: post.data.cover_image,
              width: Math.min(post.data.cover_image.width, 1080),
              format: "jpg",
              quality: 90,
              background: "#fff",
            })
          : undefined;
        const coverImageHtml = coverImage
          ? `<img src="${site.origin}${coverImage.src}" alt="" />`
          : "";
        return {
          title: post.data.title,
          pubDate: post.data.date,
          link: `/${post.id}`,
          content:
            coverImageHtml +
            replaceRelativeWithAbsoluteUrls(md.render(post.body)),
        };
      })
    ),
    trailingSlash: false,
  });
};
