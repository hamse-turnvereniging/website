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
      <div class="flex flex-col gap-4 p-6 h-full min-h-0">
        <div class="flex justify-end">
          <u-button icon="i-lucide-x" variant="ghost" color="neutral" size="xl" @click="close" />
        </div>
        <div class="relative flex flex-1 min-h-0 items-center justify-center">
          <button
            v-if="photos.length > 1"
            class="absolute inset-y-0 left-0 z-10 flex w-1/4 min-w-16 items-center justify-center"
            type="button"
            aria-label="Vorige foto"
            @click="previous"
          >
            <div class="rounded-full bg-black/50 p-2">
              <u-icon name="i-lucide-chevron-left" class="size-8 text-white" />
            </div>
          </button>
          <img
            v-if="currentPhoto"
            class="max-h-full max-w-full object-contain"
            referrerPolicy="no-referrer"
            :src="buildSizedThumbnailUrl(currentPhoto.thumbnailLink, 1600)"
            :alt="currentPhoto.name"
          />
          <button
            v-if="photos.length > 1"
            class="absolute inset-y-0 right-0 z-10 flex w-1/4 min-w-16 items-center justify-center"
            type="button"
            aria-label="Volgende foto"
            @click="next"
          >
            <div class="rounded-full bg-black/50 p-2">
              <u-icon name="i-lucide-chevron-right" class="size-8 text-white" />
            </div>
          </button>
        </div>
      </div>
    </template>
  </u-modal>
</template>
