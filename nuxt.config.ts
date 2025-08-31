// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
    families: [
      {
        name: "Open Sans",
        provider: "google",
      },
    ],
  },
  hub: {
    database: true,
  },
  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER ?? "ipx",
    cloudflare: process.env.NUXT_IMAGE_CLOUDFLARE_BASE_URL
      ? {
          baseUrl: process.env.NUXT_IMAGE_CLOUDFLARE_BASE_URL,
        }
      : undefined,
    quality: 90,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
  ],
  site: {
    defaultLocale: "nl",
    name: "Hamse Turnvereniging",
    url: "https://www.hamseturnvereniging.be",
  },
  ui: {
    colorMode: false,
  },
});
