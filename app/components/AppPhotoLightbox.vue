<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

import { buildSizedThumbnailUrl, type GooglePhoto } from "#shared/utils/google-drive";

const props = defineProps<{
  photos: GooglePhoto[];
  modelValue: number | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number | null];
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isOpen = computed(() => props.modelValue !== null);
const currentPhoto = computed(() =>
  props.modelValue !== null ? props.photos[props.modelValue] : null
);

function close() {
  emit("update:modelValue", null);
}

function previous() {
  if (props.modelValue === null) return;

  emit("update:modelValue", (props.modelValue - 1 + props.photos.length) % props.photos.length);
}

function next() {
  if (props.modelValue === null) return;

  emit("update:modelValue", (props.modelValue + 1) % props.photos.length);
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (event.key === "ArrowLeft") previous();
  if (event.key === "ArrowRight") next();
  if (event.key === "Escape") close();
}

useEventListener("keydown", onKeydown);
</script>

<template>
  <u-modal
    :open="isOpen"
    :fullscreen="breakpoints.smallerOrEqual('sm').value"
    :ui="{ content: 'md:max-w-4xl' }"
    @update:open="(value) => !value && close()"
  >
    <template #content>
      <div class="relative flex h-full min-h-0 items-center justify-center p-6">
        <u-button
          class="absolute right-4 top-4 z-10 rounded-full bg-black/50! text-white! hover:bg-black/70!"
          icon="i-lucide-x"
          variant="ghost"
          size="xl"
          @click="close"
        />
        <u-button
          v-if="photos.length > 1"
          class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50! text-white! hover:bg-black/70!"
          icon="i-lucide-chevron-left"
          variant="ghost"
          size="xl"
          @click="previous"
        />
        <img
          v-if="currentPhoto"
          class="max-h-[85vh] max-w-full object-contain"
          :src="buildSizedThumbnailUrl(currentPhoto.thumbnailLink, 1600)"
          :alt="currentPhoto.name"
        />
        <u-button
          v-if="photos.length > 1"
          class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50! text-white! hover:bg-black/70!"
          icon="i-lucide-chevron-right"
          variant="ghost"
          size="xl"
          @click="next"
        />
      </div>
    </template>
  </u-modal>
</template>
