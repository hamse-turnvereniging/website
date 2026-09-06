<script lang="ts" setup>
import LightGallery from "lightgallery/vue";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import { buildSizedThumbnailUrl } from "#shared/utils/google-drive";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

useHead({
  title: "Foto's",
  // Applies to every request this document makes, including the <img> tags
  // lightGallery inserts dynamically — unlike setting `referrerPolicy` on
  // those elements after the fact, this can't lose the race against the
  // browser already having started the request with the default referrer.
  meta: [{ name: "referrer", content: "no-referrer" }],
});

const { data } = await useFetch("/api/fotos");

const photos = computed(() => data.value?.photos ?? []);
const hasError = computed(() => data.value?.error === true);

const lightGalleryPlugins = [lgThumbnail, lgZoom];
const lightGalleryLicenseKey = useRuntimeConfig().public.lightGalleryLicenseKey;
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>Foto's</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16 w-full">
    <div class="flex flex-col gap-4">
      <h2>Fotoalbum</h2>
      <p>Een greep uit onze activiteiten. Klik op een foto om ze groter te bekijken.</p>
    </div>
    <p v-if="hasError" class="text-center text-xl">
      De foto's konden niet geladen worden. Probeer het later opnieuw.
    </p>
    <p v-else-if="photos.length === 0" class="text-center text-xl">
      Er staan nog geen foto's in het album.
    </p>
    <client-only v-else>
      <light-gallery
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        :settings="{ plugins: lightGalleryPlugins, licenseKey: lightGalleryLicenseKey, speed: 300 }"
      >
        <a
          v-for="photo in photos"
          :key="photo.id"
          class="block aspect-square overflow-hidden rounded-lg cursor-pointer"
          :href="buildSizedThumbnailUrl(photo.thumbnailLink, 1600)"
        >
          <img
            class="w-full h-full object-cover hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
            :src="buildSizedThumbnailUrl(photo.thumbnailLink, 400)"
            :alt="photo.name"
            loading="lazy"
          />
        </a>
      </light-gallery>
    </client-only>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
