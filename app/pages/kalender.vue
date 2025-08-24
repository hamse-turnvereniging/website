<script lang="ts" setup>
import { ref } from "vue";
import { ContentRenderer, UAccordion } from "#components";
import type { AccordionItem } from "@nuxt/ui";
import { addDays, startOfToday } from "date-fns";

const items = ref<AccordionItem[]>([]);

const { data: calendar } = await useAsyncData("calendar", () =>
  queryCollection("kalender")
    .where("date", ">=", addDays(startOfToday(), -1).toISOString())
    .order("date", "ASC")
    .all()
);

if (calendar.value) {
  for (const event of calendar.value) {
    items.value.push({
      label: event.title,
      content: event.description,
      body: event.body,
    });
  }
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>Kalender</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16 w-full">
    <div class="flex flex-col gap-3">
      <h2>Seizoen 2025-2026</h2>
      <p>
        Hier kan je al onze activiteiten van dit turnseizoen terugvinden. We vullen deze kalender
        regelmatig aan, dus kom hier zeker nog eens terug!
      </p>
    </div>
    <UAccordion
      :items
      :ui="{
        trailingIcon: 'size-8! text-neutral-400 group-data-[state=open]:text-primary-500',
      }"
      :unmount-on-hide="false"
    >
      <template #default="{ item }">
        <div class="flex flex-col gap-1">
          <h3>{{ item.label }}</h3>
          <p class="text-neutral-400">{{ item.content }}</p>
        </div>
      </template>
      <template #content="{ item }">
        <ContentRenderer class="answer pb-3.5" :value="item.body" />
      </template>
    </UAccordion>
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
