import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: z
      .object({
        title: z.string(),
        date: z.date().optional(),
        cover_image: z.string().optional(),
        starred: z.boolean().default(false),
        unlisted: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .refine((data) => data.date || data.draft, {
        message: "Must have either a date or draft: true",
      }),
  }),
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: z.object({}),
  }),
};
