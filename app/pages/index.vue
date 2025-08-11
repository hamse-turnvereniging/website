<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="flex flex-col max-w-6xl mx-auto px-6 py-[230px]">
      <h1 class="font-bold text-white text-shadow">
        Een fijne turnervaring<br />
        voor elke leeftijd
      </h1>
    </div>
  </section>
  <section id="welcome">
    <div class="circle circle-primary w-[1200px] top-[200px] right-0" />
    <div class="flex flex-col max-w-6xl px-6 py-16 mx-auto">
      <div class="flex flex-row items-center gap-12">
        <img class="flex-none" src="https://placehold.co/600x400" />
        <div class="flex flex-col gap-6">
          <h1 class="text-white">Welkom!</h1>
          <div class="flex flex-col gap-3">
            <p>
              Bij ons draait het om meer dan alleen turnen. Wij helpen jong en oud hun grenzen te
              verleggen, zelfvertrouwen op te bouwen en samen plezier te beleven.
            </p>
            <p>
              Of je nu komt om nieuwe turnvaardigheden te leren, je techniek te verbeteren of om
              gewoon te bewegen: onze enthousiaste trainers staan voor je klaar.
            </p>
            <p>
              Kom zeker langs voor een gratis proefles en ontdek zelf waarom turnen een sport voor
              jouw is!
            </p>
          </div>
          <!-- TODO: Bekijk ons aanbod? -->
          <NuxtLink to="/aanbod" class="flex"><button class="flex-1">Aanbod</button></NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <section id="spotlight">
    <div class="circle circle-grey w-[800px]" />
    <div class="flex flex-col max-w-6xl px-6 py-16 mx-auto">
      <div class="flex flex-row gap-12">
        <div class="flex flex-col gap-6">
          <img src="https://placehold.co/300x200" />
          <h1>Kom proberen</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente
            fuga voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis,
            beatae sit delectus! Culpa, quibusdam alias.
          </p>
          <!-- TODO: Bekijk ons aanbod? -->
          <NuxtLink to="/aanbod" class="flex"><button class="flex-1">Aanbod</button></NuxtLink>
        </div>
        <div class="flex flex-col gap-6">
          <img src="https://placehold.co/300x200" />
          <h1>Trainers gezocht</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente
            fuga voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis,
            beatae sit delectus! Culpa, quibusdam alias.
          </p>
          <!-- TODO: Bekijk onze vacatures? -->
          <button>Vacatures</button>
        </div>
        <div class="flex flex-col gap-6">
          <img src="https://placehold.co/300x200" />
          <h1>Onze activiteiten</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam similique sapiente
            fuga voluptates laboriosam minus ad impedit quia in et nobis vel consectetur officiis,
            beatae sit delectus! Culpa, quibusdam alias.
          </p>
          <!-- TODO: Bekijk onze kalender? -->
          <NuxtLink to="/kalender" class="flex"><button class="flex-1">Kalender</button></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
section#banner {
  height: 560px;
  background-image: url("https://placehold.co/1600x560");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
