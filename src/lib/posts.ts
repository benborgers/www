import { DateTime } from "luxon";

type BlogPost = {
  title: string;
  date: DateTime;
  slug: string;
  technical: boolean;
  html?: string;
  component?: Function;
};

export const allBlogPosts = async (files, ghosts): Promise<BlogPost[]> => {
  console.log("allBlogPosts()");

  const markdownPosts: BlogPost[] = files.map((file) => {
    const post: BlogPost = {
      title: file.frontmatter.title,
      date: DateTime.fromISO(file.frontmatter.date, { zone: "UTC" }),
      slug: file.file.split("/").pop().split(".")[0],
      technical: file.file.includes("markdown")
        ? true
        : file.frontmatter.technical,
      component: file.Content,
    };

    return post;
  });

  const ghostPosts: BlogPost[] = ghosts[0].default.db[0].data.posts
    .filter((object) => object.type === "post" && object.status === "published")
    .map((object) => {
      const post: BlogPost = {
        title: object.title,
        date: DateTime.fromISO(object.published_at, {
          zone: "America/New_York",
        }),
        slug: object.slug,
        technical: !!ghosts[0].default.db[0].data.posts_tags.find(
          (pivot) =>
            pivot.post_id === object.id &&
            pivot.tag_id === "6201374c0476c71d38b9a1e4" // Ghost ID for '#technical' tag
        ),
        html: object.html
          .replace(/__GHOST_URL__\/content\/images/g, "/ghost")
          .replace(/__GHOST_URL__/g, "/posts"),
      };

      return post;
    });

  return [...markdownPosts, ...ghostPosts].sort((a, b) =>
    a.date > b.date ? -1 : 1
  );
};
