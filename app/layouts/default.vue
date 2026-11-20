<script setup lang="ts">
// Generated on the server and passed along in the payload so hydration matches,
// then regenerated on every client-side navigation.
const circleStyle = useState("background-circles", () => randomCircleStyle());
const route = useRoute();

watch(
  () => route.path,
  () => {
    circleStyle.value = randomCircleStyle();
  },
);
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <nuxt-loading-indicator color="#a0ef94" />
  <app-banner class="flex-initial" />
  <app-header class="flex-initial" />
  <main class="flex-auto flex flex-col" :style="circleStyle">
    <slot />
  </main>
  <app-footer class="flex-initial" />
</template>
