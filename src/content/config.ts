import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      unlisted: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
  }),
  pages: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date().optional(),
    }),
  }),
};
