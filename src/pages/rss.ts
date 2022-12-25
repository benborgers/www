import rss from "@astrojs/rss";
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
      })),
  });
