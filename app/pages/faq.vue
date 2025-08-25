<script lang="ts" setup>
import { ref } from "vue";
import type { AccordionItem } from "@nuxt/ui";

useHead({
  title: "FAQ",
});

const items = ref<AccordionItem[]>([]);

const { data: faq } = await useAsyncData("faq", () =>
  queryCollection("faq").order("order", "ASC").all()
);

if (faq.value) {
  for (const question of faq.value) {
    items.value.push({
      label: question.title,
      content: question.description,
      body: question.body,
    });
  }
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>FAQ</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16 w-full">
    <div class="flex flex-col gap-3">
      <h2>Meest gestelde vragen</h2>
      <p>Ontdek hier de antwoorden op de meest gestelde vragen.</p>
    </div>
    <u-accordion
      :items
      :ui="{
        label: 'text-2xl font-medium text-secondary',
        trailingIcon: 'size-8! text-neutral-400 group-data-[state=open]:text-primary-500',
      }"
      :unmount-on-hide="false"
    >
      <template #content="{ item }">
        <content-renderer class="answer pb-3.5" :value="item.body" />
      </template>
    </u-accordion>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>

<style>
@reference "./../assets/css/main.css";

.answer {
  p {
    @apply pb-2;
  }

  strong {
    @apply font-semibold;
  }
}
</style>
