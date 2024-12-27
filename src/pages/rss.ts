import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getPosts from "../lib/getPosts";

export const GET: APIRoute = async ({ site }) => {
  const posts = [
    ...(await getPosts({ includeUnlisted: false })),
    ...(await getCollection("pages")),
  ];

  return rss({
    title: "Ben Borgers",
    description: "Ben Borgers’ personal website.",
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/${post.slug}`,
    })),
    trailingSlash: false,
  });
};
