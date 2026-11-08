// Posts that are fully custom pages at src/pages/<id>.astro instead of
// Markdown in src/content/posts. Listing one here adds it to /blog, RSS, and
// related posts, with the same options as Markdown frontmatter.
export interface CustomPostInfo {
  id: string;
  title: string;
  date?: Date;
  starred?: boolean;
  unlisted?: boolean;
  draft?: boolean;
}

export const customPosts: CustomPostInfo[] = [
  {
    id: "stratton",
    title: "Dorm room polls",
    date: new Date("2026-11-08"),
  },
];
