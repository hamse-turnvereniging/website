<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

import type { GooglePhoto } from "#shared/utils/google-drive";

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
      <div class="relative flex flex-col gap-4 p-6 h-full min-h-0 items-center justify-center">
        <u-button
          class="absolute right-4 top-4"
          icon="i-lucide-x"
          variant="ghost"
          color="neutral"
          size="xl"
          @click="close"
        />
        <nuxt-img
          v-if="currentPhoto"
          class="max-h-[70vh] max-w-full object-contain"
          :src="`/api/fotos/${currentPhoto.id}`"
          :alt="currentPhoto.name"
          width="1600"
          height="1600"
          fit="contain"
        />
        <div class="flex justify-between w-full">
          <u-button
            icon="i-lucide-chevron-left"
            variant="ghost"
            color="neutral"
            size="xl"
            @click="previous"
          />
          <u-button
            icon="i-lucide-chevron-right"
            variant="ghost"
            color="neutral"
            size="xl"
            @click="next"
          />
        </div>
      </div>
    </template>
  </u-modal>
</template>
