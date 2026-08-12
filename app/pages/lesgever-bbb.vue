<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>Lesgever BBB</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-4">
      <h2>Lesgever BBB gezocht in Oostham</h2>
      <p>De Hamse Turnvereniging is op zoek naar een enthousiaste lesgever voor onze lessen BBB.</p>
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-4">
          <div style="min-width: 90px;"><span class="font-semibold">Club</span>:</div>
          <div>Hamse Turnvereniging</div>
        </div>
        <div class="flex flex-row gap-4">
          <div style="min-width: 90px;"><span class="font-semibold">Locatie</span>:</div>
          <div>Kristoffelheem, Schoolstraat 10, 3945 Tessenderlo-Ham</div>
        </div>
        <div class="flex flex-row gap-4">
          <div style="min-width: 90px;"><span class="font-semibold">Wanneer</span>:</div>
          <div>Elke woensdag van 19u tot 20u (geen lessen tijdens de schoolvakanties)</div>
        </div>
        <div class="flex flex-row gap-4">
          <div style="min-width: 90px;"><span class="font-semibold">Startdag</span>:</div>
          <div>woensdag 9 september 2026</div>
        </div>
        <div class="flex flex-row gap-4">
          <div style="min-width: 90px;"><span class="font-semibold">Doelgroep</span>:</div>
          <div>Volwassenen</div>
        </div>
        <div>
          <span class="font-semibold">Wie zoeken we?</span>
          <ul>
            <li>Een trainer met vooral veel enthousiasme</li>
            <li>Een trainersdiploma is mooi meegenomen, maar zeker geen vereiste</li>
            <li>Je bent beschikbaar vanaf september 2026 en engageert je om gedurende het volledige schooljaar les te geven op woensdagavond</li>
          </ul>
        </div>
        <p>
          <span class="font-semibold">Interesse?</span><br />
            Heb je interesse of ken je iemand die perfect in dit plaatje past? Laat het ons weten via <a href="mailto:info@hamseturnvereniging.be">info@hamseturnvereniging.be</a>.
        </p>
      </div>
      <p>We kijken ernaar uit om je te ontmoeten!</p>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
