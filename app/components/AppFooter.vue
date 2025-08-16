<template>
  <footer>
    <div class="flex flex-col max-w-6xl mx-auto px-8 py-8 gap-8">
      <div class="flex flex-col sm:flex-row justify-between gap-8 py-4">
        <div class="flex flex-col gap-4">
          <h3>Contact</h3>
          <div class="flex gap-2">
            <icon name="mdi-email-outline" size="24" class="text-primary" />
            <NuxtLink href="mailto:info@hamseturnvereniging.be" :external="true"
              >info@hamseturnvereniging.be</NuxtLink
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-facebook" size="24" class="text-primary" />
            <NuxtLink
              href="https://www.facebook.com/HamseTurnvereniging/"
              :external="true"
              target="_blank"
              >Hamse Turnvereniging</NuxtLink
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-instagram" size="24" class="text-primary" />
            <NuxtLink
              href="https://www.instagram.com/hamse_turnvereniging"
              :external="true"
              target="_blank"
              >@hamse_turnvereniging</NuxtLink
            >
          </div>
        </div>
        <nav class="flex flex-col gap-2">
          <NuxtLink to="/">Welkom</NuxtLink>
          <NuxtLink to="/aanbod">Aanbod</NuxtLink>
          <NuxtLink to="/kalender">Kalender</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
          <NuxtLink to="/inschrijven">Inschrijven</NuxtLink>
        </nav>
        <div class="flex flex-row sm:flex-col justify-between sm:gap-3">
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/clubreglement">Clubreglement</NuxtLink>
            <NuxtLink to="/verzekering">Verzekering</NuxtLink>
            <NuxtLink to="/privacyverklaring">Privacyverklaring</NuxtLink>
          </nav>
          <NuxtLink href="https://www.gymfed.be" :external="true" target="_blank">
            <img src="~/assets/images/gymfed.png" alt="Gymfed logo" width="120" />
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between text-center gap-3">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} Hamse Turnvereniging. Alle rechten voorbehouden.
        </div>
        <div class="website-by">
          Website door
          <NuxtLink href="https://steffbeckers.com/nl" :external="true" target="_blank"
            >Steff Beckers</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "./../assets/css/main.css";

footer {
  @apply bg-neutral-900 text-white;

  h3 {
    @apply text-white;
  }

  a {
    @apply text-white;

    &.router-link-active {
      @apply text-primary font-bold;
    }
  }
}

.copyright,
.website-by {
  @apply text-neutral-300;

  a {
    @apply text-neutral-300;

    &:hover {
      @apply text-primary;
    }
  }
}
</style>
