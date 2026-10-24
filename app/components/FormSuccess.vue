<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  restartLabel: string;
  canRestart: boolean;
}>();

defineEmits<{ restart: [] }>();

const confirmation = useTemplateRef("confirmation");

onMounted(() => {
  confirmation.value?.focus({ preventScroll: true });
  confirmation.value?.scrollIntoView({ behavior: "smooth", block: "center" });
});
</script>

<template>
  <div
    ref="confirmation"
    role="status"
    tabindex="-1"
    class="flex flex-col items-start gap-4 rounded-xl border border-primary-300 bg-primary-50 p-6 sm:p-8 focus:outline-none"
  >
    <u-icon name="i-lucide-circle-check" class="size-12 text-secondary" aria-hidden="true" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <p>
      Je ontvangt een bevestiging via e-mail.
      <span class="font-semibold">Controleer ook je spam/ongewenste e-mail.</span>
    </p>
    <u-button
      v-if="canRestart"
      :label="restartLabel"
      type="button"
      icon="i-lucide-plus"
      size="xl"
      color="secondary"
      @click="$emit('restart')"
    />
  </div>
</template>
