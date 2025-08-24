// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // $development: {
  //   hub: {
  //     remote: true,
  //   },
  //   image: {
  //     alias: {
  //       "hub-images": "http://localhost:3000/api/_hub/blob/images/",
  //     },
  //     domains: ["localhost:3000"],
  //   },
  // },
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
    // blob: true,
    database: true,
  },
  image: {
    // alias: {
    //   "hub-images": "http://www.hamseturnvereniging.be/api/_hub/blob/images/",
    // },
    // domains: ["www.hamseturnvereniging.be"],
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
