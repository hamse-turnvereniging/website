<script setup lang="ts">
import { nl } from "@nuxt/ui/locale";

// Without JavaScript the reveal animations never run, so keep that content visible.
useHead({
  noscript: [
    { innerHTML: "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>" },
  ],
});
</script>

<template>
  <u-app :locale="nl">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </u-app>
</template>
