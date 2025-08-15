// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
  },
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
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/seo",
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
