<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto px-8 py-[240px]">
      <h1>
        Een fijne turnervaring<br />
        voor elke leeftijd
      </h1>
    </div>
  </section>
  <div class="flex flex-col gap-16 py-16">
    <section class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8">
      <div class="flex-1">
        <nuxt-img
          class="w-full"
          fit="cover"
          src="/images/welkom/welkom.jpg"
          width="600"
          height="400"
        />
      </div>
      <div class="flex flex-1 flex-col gap-6">
        <div class="flex flex-col gap-3">
          <h2>Welkom!</h2>
          <p>
            Bij ons draait het om meer dan alleen turnen. Wij helpen
            <span class="font-semibold">jong en oud</span> hun grenzen te verleggen, zelfvertrouwen
            op te bouwen en samen plezier te beleven.
          </p>
          <p>
            Of je nu komt om nieuwe turnvaardigheden te leren, je techniek te verbeteren of om
            gewoon te <span class="font-semibold">bewegen</span>: onze enthousiaste trainers staan
            voor je klaar.
          </p>
          <p>
            Kom zeker langs voor een <span class="font-semibold">gratis proefles</span> en ontdek
            zelf waarom turnen een sport voor jouw is!
          </p>
        </div>
        <u-button to="aanbod" color="secondary" size="xl">Aanbod</u-button>
      </div>
    </section>
    <section
      id="in-de-schijnwerper"
      class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 px-8"
    >
      <div class="flex flex-col gap-4 pb-4">
        <nuxt-img
          class="w-full"
          fit="cover"
          src="/images/welkom/kom-proberen.jpg"
          alt="Kom proberen afbeelding"
          width="300"
          height="200"
        />
        <div class="flex flex-col gap-3">
          <h3>Kom proberen</h3>
          <p>
            Ben je benieuwd of turnen iets voor jou is? Kom het gewoon proberen! Bij ons is de
            <span class="font-semibold">eerste les</span> helemaal
            <span class="font-semibold">gratis</span>, zo kun je vrijblijvend ontdekken hoe leuk het
            is om te bewegen, te springen en nieuwe dingen te leren.
          </p>
          <p>
            Bij onze turnclub is <span class="font-semibold">iedereen welkom</span>, van jonge
            beginners tot meer ervaren sporters. Onze enthousiaste trainers zorgen voor een
            <span class="font-semibold">fijne sfeer</span> waarin je je meteen thuis voelt.
          </p>
          <p>
            Trek je <span class="font-semibold">sportkleding</span> aan, neem een
            <span class="font-semibold">flesje water</span> mee en kom een keertje meedoen.
            Misschien ontdek je wel je nieuwe favoriete sport!
          </p>
        </div>
        <u-button to="inschrijven" color="secondary" size="xl">Inschrijven</u-button>
      </div>
      <div class="flex flex-col gap-4 pb-4">
        <nuxt-img
          class="w-full"
          fit="cover"
          src="/images/welkom/onze-activiteiten.jpg"
          alt="Onze activiteiten afbeelding"
          width="300"
          height="200"
        />
        <div class="flex flex-col gap-3">
          <h3>Onze activiteiten</h3>
          <p>
            Naast de wekelijkse lessen organiseren we regelmatig leuke evenementen, zoals ons
            jaarlijkse
            <span class="font-semibold">turnfeest</span>, een gezellige
            <span class="font-semibold">eetdag</span> en andere sportieve of sociale activiteiten.
          </p>
          <p>
            Op <span class="font-semibold">onze kalender</span> vind je een volledig overzicht van
            alles wat er te doen is, van trainingen tot speciale evenementen. Zo weet je altijd waar
            en wanneer je erbij kunt zijn!
          </p>
        </div>
        <u-button to="kalender" color="secondary" size="xl">Kalender</u-button>
      </div>
      <div class="flex flex-col gap-4 pb-4">
        <nuxt-img
          class="w-full"
          fit="cover"
          src="/images/welkom/lesgevers-gezocht.jpg"
          alt="Lesgevers gezocht afbeelding"
          width="300"
          height="200"
        />
        <div class="flex flex-col gap-3">
          <h3>Lesgevers gezocht</h3>
          <p>
            Heb jij een passie voor turnen én wil je je enthousiasme delen met anderen? Wij zijn op
            zoek naar <span class="font-semibold">gemotiveerde lesgevers</span> die onze sporters
            willen begeleiden, inspireren en laten groeien.
          </p>
          <p>
            <span class="font-semibold">Geen ervaring? Geen probleem!</span> Ben je
            <span class="font-semibold">16 jaar of ouder</span>? Laat gerust iets weten en start als
            begeleider bij één van onze groepen. Onze trainers helpen je graag op weg!
          </p>
          <p>
            Klinkt dit als iets voor jou?
            <span class="font-semibold">Stuur ons een berichtje of kom eens langs</span>, en wie
            weet sta jij binnenkort voor een groep gemotiveerde turners!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
