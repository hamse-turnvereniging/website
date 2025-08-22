<script lang="ts" setup>
import type { AccordionItem } from "@nuxt/ui";
import { UAccordion } from "#components";

useHead({
  title: "FAQ",
});

const items = ref<AccordionItem[]>([]);

const data = await queryCollection("faq").first();
const rawItems = data?.body.value;

if (rawItems) {
  for (let i = 0; i < rawItems.length; i++) {
    const node = rawItems[i];
    if (node && node[0] === "h1") {
      const label = node[2] as string;
      const next = rawItems[i + 1];
      const content = next && next[0] === "p" ? (next[2] as string) : "";
      items.value.push({ label, content });
    }
  }
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-6 py-[120px]">
      <h1>FAQ</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16 w-full">
    <div class="flex flex-col gap-3">
      <h2>Meest gestelde vragen</h2>
      <p>Ontdek hier de antwoorden op de meest gestelde vragen.</p>
    </div>
    <UAccordion :items />
  </section>
</template>

<style scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
}
</style>
