import { DateTime } from "luxon";

type Post = {
  title: string;
  date: DateTime;
  slug: string;
  technical: boolean;
  html?: string;
  component?: () => {};
};

function slugFromPath(path: string): string {
  const pieces = path.split("/");
  return pieces[pieces.length - 1].split(".")[0];
}

export async function getPosts() {
  const posts: Post[] = [];

  const glob = await import.meta.glob("../../posts/**/*");
  for (const relativePath of Object.keys(glob)) {
    const file: any = await glob[relativePath]();
    const path = relativePath.replace("../../posts/", "");

    if (path === "ghost.json") {
      const ghostObjects = file.db[0].data.posts.filter(
        (post: any) => post.type === "post" && post.status === "published"
      );
      for (const object of ghostObjects) {
        posts.push({
          title: object.title,
          date: DateTime.fromISO(object.published_at, {
            zone: "America/New_York",
          }),
          slug: object.slug,
          technical: Boolean(
            file.db[0].data.posts_tags.find(
              (pivot: any) =>
                pivot.post_id === object.id &&
                pivot.tag_id === "6201374c0476c71d38b9a1e4" // Ghost ID for '#technical' tag
            )
          ),
          html: object.html
            .replace(/__GHOST_URL__\/content\/images/g, "/ghost")
            .replace(/__GHOST_URL__/g, "/posts"),
        });
      }
    } else {
      posts.push({
        title: file.frontmatter.title,
        date: DateTime.fromISO(file.frontmatter.date, { zone: "UTC" }),
        slug: slugFromPath(path),
        technical: path.startsWith("markdown")
          ? true
          : file.frontmatter.technical,
        component: file.Content,
      });
    }
  }

  return posts;
}
