<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner" class="shadow-lg">
    <div class="max-w-6xl mx-auto px-8 py-[240px]">
      <h1 class="font-bold text-white text-shadow">
        Een fijne turnervaring<br />
        voor elke leeftijd
      </h1>
    </div>
  </section>
  <section
    id="welkom"
    class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8 py-16"
  >
    <div class="flex-1">
      <img src="https://placehold.co/600x400" class="shadow-lg" />
    </div>
    <div class="flex flex-1 flex-col gap-6">
      <h1 class="text-secondary">Welkom!</h1>
      <div class="flex flex-col gap-3">
        <p>
          Bij ons draait het om meer dan alleen turnen. Wij helpen jong en oud hun grenzen te
          verleggen, zelfvertrouwen op te bouwen en samen plezier te beleven.
        </p>
        <p>
          Of je nu komt om nieuwe turnvaardigheden te leren, je techniek te verbeteren of om gewoon
          te bewegen: onze enthousiaste trainers staan voor je klaar.
        </p>
        <p>
          Kom zeker langs voor een gratis proefles en ontdek zelf waarom turnen een sport voor jouw
          is!
        </p>
      </div>
      <!-- TODO: Bekijk ons aanbod? -->
      <NuxtLink to="/aanbod" class="flex"><button class="flex-1">Aanbod</button></NuxtLink>
    </div>
  </section>
  <section
    id="in-de-schijnwerper"
    class="max-w-6xl mx-auto grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-16"
  >
    <div class="flex flex-col gap-6">
      <img src="https://placehold.co/300x200" alt="Kom proberen afbeelding" class="shadow-lg" />
      <h2 class="text-secondary">Kom proberen</h2>
      <div class="flex flex-col gap-3">
        <p>
          Ben je benieuwd of turnen iets voor jou is? Kom het gewoon proberen! Bij ons is de
          <span class="font-bold">eerste les</span> helemaal <span class="font-bold">gratis</span>,
          zo kun je vrijblijvend ontdekken hoe leuk het is om te bewegen, te springen en nieuwe
          dingen te leren.
        </p>
        <p>
          Bij onze turnclub is <span class="font-bold">iedereen welkom</span>, van jonge beginners
          tot meer ervaren sporters. Onze enthousiaste trainers zorgen voor een
          <span class="font-bold">fijne sfeer</span> waarin je je meteen thuis voelt.
        </p>
        <p>
          Trek je <span class="font-bold">sportkleding</span> aan, neem een
          <span class="font-bold">flesje water</span> mee en kom een keertje meedoen. Misschien
          ontdek je wel je nieuwe favoriete sport!
        </p>
      </div>
      <!-- TODO: Bekijk ons aanbod? -->
      <NuxtLink to="/aanbod" class="flex"><button class="flex-1">Aanbod</button></NuxtLink>
    </div>
    <div class="flex flex-col gap-6">
      <img
        src="https://placehold.co/300x200"
        alt="Lesgevers gezocht afbeelding"
        class="shadow-lg"
      />
      <h2 class="text-secondary">Lesgevers gezocht</h2>
      <div class="flex flex-col gap-3">
        <p>
          Heb jij een passie voor turnen én wil je je enthousiasme delen met anderen? Wij zijn op
          zoek naar <span class="font-bold">gemotiveerde lesgevers</span> die onze sporters willen
          begeleiden, inspireren en laten groeien.
        </p>
        <p>
          <span class="font-bold">Geen ervaring? Geen probleem!</span> Ben je
          <span class="font-bold">16 jaar of ouder</span>? Laat gerust iets weten en start als
          begeleider bij één van onze groepen. Onze trainers helpen je graag op weg!
        </p>
        <p>
          Klinkt dit als iets voor jou? Stuur ons een berichtje of kom eens langs, en wie weet sta
          jij binnenkort voor een groep gemotiveerde turners!
        </p>
      </div>
      <!-- TODO: Bekijk onze vacatures? -->
      <!-- <button>Vacatures</button> -->
    </div>
    <div class="flex flex-col gap-6">
      <img
        src="https://placehold.co/300x200"
        alt="Onze activiteiten afbeelding"
        class="shadow-lg"
      />
      <h2 class="text-secondary">Onze activiteiten</h2>
      <div class="flex flex-col gap-3">
        <p>
          Naast de wekelijkse lessen organiseren we regelmatig leuke evenementen, zoals ons
          jaarlijkse
          <span class="font-bold">turnfeest</span>, een gezellige
          <span class="font-bold">eetdag</span> en andere sportieve of sociale activiteiten.
        </p>
        <p>
          Op <span class="font-bold">onze kalender</span> vind je een volledig overzicht van alles
          wat er te doen is, van trainingen tot speciale evenementen. Zo weet je altijd waar en
          wanneer je erbij kunt zijn!
        </p>
      </div>
      <!-- TODO: Bekijk onze kalender? -->
      <NuxtLink to="/kalender" class="flex"><button class="flex-1">Kalender</button></NuxtLink>
    </div>
  </section>
</template>

<style lang="css" scoped>
section#banner {
  background-image: url("https://placehold.co/1600x580");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
