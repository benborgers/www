import { DateTime } from "luxon";
import shiki from "shiki";

export type Post = {
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

const highlighter = await shiki.getHighlighter({ theme: "dracula" });

function processGhostHtml(html: string): string {
  return html
    .replace(/__GHOST_URL__\/content\/images/g, "/ghost")
    .replace(/__GHOST_URL__/g, "/posts")
    .replace(
      /<pre><code class="language-(.+?)">(.+?)<\/code><\/pre>/gs,
      (_: any, language: string, code: string) => {
        return highlighter.codeToHtml(
          code
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&"),
          { lang: language }
        );
      }
    );
}

let POSTS_CACHE: Post[];

export async function getPosts() {
  if (POSTS_CACHE) return POSTS_CACHE;

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
          html: processGhostHtml(object.html),
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

  const ghostContent = await (
    await fetch(
      "https://write.benborgers.com/ghost/api/content/posts?include=tags&limit=all&key=518c3697d04ae2e5c791df241b"
    )
  ).json();

  for (const object of ghostContent.posts) {
    posts.push({
      title: object.title,
      date: DateTime.fromISO(object.published_at, {
        zone: "America/New_York",
      }),
      slug: object.slug,
      technical: Boolean(
        object.tags.find((tag: any) => tag.name === "#technical")
      ),
      html: processGhostHtml(object.html),
    });
  }

  POSTS_CACHE = posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  return POSTS_CACHE;
}
