import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z
      .object({
        title: z.string(),
        date: z.date().optional(),
        bestOf: z.boolean().default(false),
        unlisted: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .refine((data) => data.date || data.draft, {
        message: "Must have either a date or draft: true",
      }),
  }),
  pages: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string().optional(),
    }),
  }),
};
