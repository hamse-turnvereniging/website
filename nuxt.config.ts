// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-02-01",
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
    db: "sqlite",
  },
  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER ?? "ipx",
    cloudflare: process.env.NUXT_IMAGE_CLOUDFLARE_BASE_URL
      ? {
          baseURL: process.env.NUXT_IMAGE_CLOUDFLARE_BASE_URL,
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
    "nuxt-qrcode",
  ],
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    rollupConfig: {
      external: ["handlebars-helpers"],
    },
  },
  runtimeConfig: {
    public: {
      // Free GPLv3 key requested from contact@lightgalleryjs.com; falls back to
      // the vendor's own placeholder (shows a console warning) until it's set.
      lightGalleryLicenseKey: process.env.NUXT_PUBLIC_LIGHT_GALLERY_LICENSE_KEY ?? "0000-0000-000-0000",
    },
  },
  site: {
    defaultLocale: "nl",
    name: "Hamse Turnvereniging",
    url: "https://www.hamseturnvereniging.be",
  },
  ui: {
    colorMode: false,
  },
});
