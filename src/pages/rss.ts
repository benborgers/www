import rss from "@astrojs/rss";
import sanitize from "sanitize-html";
import { getPosts } from "../lib/blog";

export const get = async () =>
  rss({
    title: "Ben Borgers",
    description: "The personal blog of Ben Borgers.",
    site: import.meta.env.SITE,
    items: (await getPosts())
      .filter((post) => !post.technical)
      .map((post) => ({
        title: post.title,
        link: `/posts/${post.slug}`,
        pubDate: post.date.toJSDate(),
        // This doesn't work for markdown posts, but I'm not writing any new markdown posts.
        content: post.html ? sanitize(post.html) : "",
      })),
  });
