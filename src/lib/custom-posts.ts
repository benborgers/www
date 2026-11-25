// Posts that are fully custom pages at src/pages/<id>.astro instead of
// Markdown in src/content/posts. Listing one here adds it to /blog and RSS,
// with the same options as Markdown frontmatter.
export interface CustomPostInfo {
  id: string;
  title: string;
  date?: Date;
  unlisted?: boolean;
  draft?: boolean;
}

export const customPosts: CustomPostInfo[] = [
  {
    id: "stratton",
    title: "Dorm room polls",
    date: new Date("2026-11-08"),
  },
  {
    id: "ai-timeline",
    title: "What AI models was I using when?",
    draft: true,
  },
];
