import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    faq: defineCollection({
      type: "page",
      source: "FAQ/*.md",
    }),
  },
});
