<template>
  <component :is="as">
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ as?: string }>(), { as: "div" });

// Plain counter: Reveal children register in setup order, which is the same on server and client.
let count = 0;
provide("reveal-group", { register: () => count++ });
</script>
