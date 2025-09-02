<script setup lang="ts">
import { nl } from "@nuxt/ui/locale";
</script>

<template>
  <u-app :locale="nl">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </u-app>
</template>
