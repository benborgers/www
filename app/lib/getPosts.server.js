// import * as fs from "fs";
import matter from "gray-matter";
import sanity from "~/lib/sanity.server";

export default async function () {
  const markdownSlugs = fs.readdirSync("./app/posts").map((file) => {
    const { data } = matter(fs.readFileSync(`./app/posts/${file}`, "utf-8"));

    return {
      slug: file.replace(/\.md$/, ""),
      date: data.date,
      title: data.title,
    };
  });

  const result = await sanity.fetch(`*[_type == "post" && tag == "technical"] {
    "slug": slug.current,
    date,
    title
  }`);

  const posts = [...markdownSlugs, ...result];

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
