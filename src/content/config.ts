import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      unlisted: z.boolean().default(false),
      date: z.date(),
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
