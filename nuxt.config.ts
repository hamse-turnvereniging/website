// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    hub: {
      // TODO: Does "preview" work already? New @nuxthub/core version available?
      remote: true,
    },
  },
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
  hub: {
    blob: true,
    database: true,
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
