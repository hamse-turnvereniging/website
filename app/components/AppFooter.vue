<template>
  <footer class="shadow-lg">
    <div class="flex flex-col max-w-6xl mx-auto px-6 py-6 gap-6">
      <div class="flex justify-between py-6">
        <div class="flex flex-col gap-4">
          <h2>Contact</h2>
          <div class="flex gap-2">
            <icon name="mdi-email-outline" size="24" class="text-primary" />
            <NuxtLink href="mailto:info@hamseturnvereniging.be" :external="true"
              >info@hamseturnvereniging.be</NuxtLink
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-facebook" size="24" class="text-primary" />
            <NuxtLink href="https://www.facebook.com/HamseTurnvereniging/" :external="true"
              >Hamse Turnvereniging</NuxtLink
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-instagram" size="24" class="text-primary" />
            <NuxtLink href="https://www.instagram.com/hamse_turnvereniging" :external="true"
              >@hamse_turnvereniging</NuxtLink
            >
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/verzekering">Verzekering</NuxtLink>
            <NuxtLink to="/privacyverklaring">Privacyverklaring</NuxtLink>
            <NuxtLink to="/clubreglement">Clubreglement</NuxtLink>
          </nav>
          <NuxtLink href="https://www.gymfed.be" :external="true">
            <img src="~/assets/images/gymfed.png" alt="Gymfed logo" width="120" />
          </NuxtLink>
        </div>
        <nav class="pages flex flex-col gap-2">
          <NuxtLink to="/">Welkom</NuxtLink>
          <NuxtLink to="/aanbod">Aanbod</NuxtLink>
          <NuxtLink to="/kalender">Kalender</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
          <NuxtLink to="/inschrijven">Inschrijven</NuxtLink>
        </nav>
      </div>
      <div class="flex justify-between">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} Hamse Turnvereniging. Alle rechten voorbehouden.
        </div>
        <div class="website-by">
          Website door
          <a href="https://steffbeckers.com/nl" target="_blank" rel="noopener noreferrer"
            >Steff Beckers</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="css" scoped>
footer {
  background-color: #202020;
  color: #ffffff;
}

nav.pages a.router-link-active {
  color: #a0ef94;
  font-weight: bold;
}
</style>
