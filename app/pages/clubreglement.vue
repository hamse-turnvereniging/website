<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>Clubreglement</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Algemene doelstelling</h2>
      <p>
        De Hamse Turnvereniging wil gezonde, aangename en verantwoorde sport aanbieden aan
        <span class="font-semibold">alle leeftijden</span> waarbij plezierbeleving steeds centraal
        staat. <span class="font-semibold">Iedereen kan lid worden.</span>
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <h2>Intern reglement</h2>
      <ul>
        <li>
          In het <span class="font-semibold">lidgeld</span> is inbegrepen: de
          <span class="font-semibold">verplichte verzekering</span>
          en de bijdrage aan de <span class="font-semibold">turnfederatie Gymfed</span>:
          <NuxtLink href="https://www.gymfed.be">www.gymfed.be</NuxtLink>
        </li>
        <li>
          <span class="font-semibold">Om te mogen deelnemen</span> aan de turnlessen dient het lid
          zijn/haar <span class="font-semibold">lidgeld betaald</span> te hebben.
          <span class="font-semibold">Uitzondering</span> hierop is de
          <span class="font-semibold">eerste kennismakingsles</span> in september.
        </li>
        <li>
          Tijdens de turnles draagt men <span class="font-semibold">sportkledij</span>. (gelieve
          <span class="font-semibold">kleuters geen turnpakje</span> aan te doen)<br />
          De foto's op de website zijn van het turnfeest, enkel dan is er een uitzondering in
          verband met kledij.
        </li>
        <li>
          <span class="font-semibold">Sportschoenen</span> met
          <span class="font-semibold">witte zolen of non-marking</span> zijn verplicht.
        </li>
        <li>
          Meisjes met <span class="font-semibold">lange haren</span> moeten hun haren
          <span class="font-semibold">in een staart</span> doen, voor de veiligheid.
        </li>
        <li>
          Het dragen van <span class="font-semibold">juwelen</span> is tijdens de les
          <span class="font-semibold">NIET toegelaten</span>.
        </li>
        <li>
          Er mag <span class="font-semibold">NIET gegeten, gedronken of gesnoept</span> worden in de
          sporthal, <span class="font-semibold">ZEKER GEEN KAUWGOM</span>.<br />
          Gelieve eten (koek) en drinken in de kleedkamer te laten.
        </li>
        <li>
          Om de <span class="font-semibold">kinderen niet af te leiden</span> tijdens het turnen is
          het wenselijk dat de <span class="font-semibold">ouders de sporthal verlaten</span>.
        </li>
        <li>
          <span class="font-semibold">GSM</span>-gebruik tijdens de lessen is
          <span class="font-semibold">NIET toegestaan</span>
        </li>
        <li>
          De leden hebben ten alle tijde
          <span class="font-semibold">respect voor de lesgevers en medesporters</span>.
        </li>
        <li>
          De lesgever zorgt voor
          <span class="font-semibold">de orde en het gunstig verloop</span> van de les.
        </li>
        <li>
          Het bestuur en de lesgevers zijn
          <span class="font-semibold"
            >niet verantwoordelijk voor diefstal of beschadiging van persoonlijke voorwerpen</span
          >.
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-3">
      <h2>Te onthouden</h2>
      <p>
        Tijdens de <span class="font-semibold">schoolvakanties</span> is er
        <span class="font-semibold">GEEN turnles</span> voor de kinderen.
      </p>
    </div>
  </section>
</template>

<style scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
}
</style>
