import ghost from "./ghost";

export const POST_TYPE = {
  TECHNICAL: "post_type_technical",
  NON_TECHNICAL: "post_type_non_technical",
};

export const POST_SOURCE = {
  FILE: "post_source_file",
  GHOST: "post_source_ghost",
};

// This function takes in the Astro global from a .astro file,
// becuase random JavaScript files don't have access to the Astro global.
export default async function (markdownPosts) {
  return [
    ...markdownPosts.map((post) => {
      const slug = post.file.pathname.replace("/posts/", "").replace(".md", "");

      return {
        slug,
        title: post.title,
        date: post.date,
        html: post.content.html,
        source: POST_SOURCE.FILE,
        type: POST_TYPE.TECHNICAL,
      };
    }),
    ...(await ghost("posts")).posts.map((post) => {
      return {
        slug: post.slug,
        title: post.title,
        date: post.published_at,
        html: post.html,
        source: POST_SOURCE.GHOST,
        type: post.tags.find((tag) => tag.name === "#technical")
          ? POST_TYPE.TECHNICAL
          : POST_TYPE.NON_TECHNICAL,
      };
    }),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
