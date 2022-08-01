type BlogPost = {
  title: string;
  date: Date;
  slug: string;
  technical: boolean;
  html?: string;
  component?: Function;
};

export const allBlogPosts = async (files, ghosts): Promise<BlogPost[]> => {
  const markdownPosts: BlogPost[] = files.map((file) => {
    const post: BlogPost = {
      title: file.frontmatter.title,
      date: new Date(file.frontmatter.date),
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
      const publishedAt = new Date(object.published_at);

      const post: BlogPost = {
        title: object.title,
        // Eastern time is either 4 or 5 hours behind UTC, depending on daylight savings.
        // We subtract 5 hours to get the EST date that Ghost saves back into EST when it's
        // interpreted as UTC (we render dates as timeZone: UTC to make markdown dates work).
        // It's a hack, but it works since we don't have any posts published 12am - 1am Eastern.
        date: new Date(publishedAt.setHours(publishedAt.getHours() - 5)),
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
