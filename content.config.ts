import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    faq: defineCollection({
      type: "page",
      source: "faq/*.md",
      schema: z.object({
        order: z.optional(z.number()),
      }),
    }),
    kalender: defineCollection({
      type: "page",
      source: "kalender/2025-2026/**/*.md",
      schema: z.object({
        date: z.date(),
      }),
    }),
  },
});
