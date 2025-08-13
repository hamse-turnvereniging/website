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
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente fuga
        voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis, beatae sit
        delectus! Culpa, quibusdam alias.
      </p>
      <!-- TODO: Bekijk ons aanbod? -->
      <NuxtLink to="/aanbod" class="flex"><button class="flex-1">Aanbod</button></NuxtLink>
    </div>
    <div class="flex flex-col gap-6">
      <img src="https://placehold.co/300x200" alt="Trainers gezocht afbeelding" class="shadow-lg" />
      <h2 class="text-secondary">Trainers gezocht</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente fuga
        voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis, beatae sit
        delectus! Culpa, quibusdam alias.
      </p>
      <!-- TODO: Bekijk onze vacatures? -->
      <button>Vacatures</button>
    </div>
    <div class="flex flex-col gap-6">
      <img
        src="https://placehold.co/300x200"
        alt="Onze activiteiten afbeelding"
        class="shadow-lg"
      />
      <h2 class="text-secondary">Onze activiteiten</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente fuga
        voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis, beatae sit
        delectus! Culpa, quibusdam alias.
      </p>
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
