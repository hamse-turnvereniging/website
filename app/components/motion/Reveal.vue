<template>
  <Motion
    :as="as"
    data-reveal
    :initial="{ opacity: 0, y: motionTokens.offset }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ ...motionTokens.viewport }"
    :transition="{
      duration: motionTokens.duration,
      ease: [...motionTokens.ease],
      delay: delay + groupDelay + loadDelay,
    }"
  >
    <slot />
  </Motion>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

withDefaults(defineProps<{ as?: string; delay?: number }>(), {
  as: "div",
  delay: 0,
});

// Inside a RevealGroup, each Reveal takes the next slot in the stagger.
const group = inject<{ register: () => number } | null>("reveal-group", null);
const groupDelay = group ? staggerDelay(group.register()) : 0;

// Only blocks already in view on page load get the extra delay; blocks revealed by scrolling later do not.
const loadDelay = ref<number>(motionTokens.loadDelay);
onMounted(() => setTimeout(() => (loadDelay.value = 0), 300));
</script>
