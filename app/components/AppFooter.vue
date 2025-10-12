<template>
  <footer>
    <div class="flex flex-col max-w-6xl mx-auto px-8 py-8 gap-8">
      <div class="flex flex-col sm:flex-row justify-between gap-8 py-4">
        <div class="flex flex-col gap-4">
          <h3>Contact</h3>
          <div class="flex gap-2">
            <icon name="mdi-email-outline" size="24" class="text-primary" />
            <nuxt-link href="mailto:info@hamseturnvereniging.be" :external="true"
              >info@hamseturnvereniging.be</nuxt-link
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-facebook" size="24" class="text-primary" />
            <nuxt-link
              href="https://www.facebook.com/HamseTurnvereniging/"
              :external="true"
              target="_blank"
              >Hamse Turnvereniging</nuxt-link
            >
          </div>
          <div class="flex gap-2">
            <icon name="mdi-instagram" size="24" class="text-primary" />
            <nuxt-link
              href="https://www.instagram.com/hamse_turnvereniging"
              :external="true"
              target="_blank"
              >@hamse_turnvereniging</nuxt-link
            >
          </div>
        </div>
        <nav class="flex flex-col gap-4">
          <nuxt-link to="/">Welkom</nuxt-link>
          <nuxt-link to="/aanbod">Aanbod</nuxt-link>
          <nuxt-link to="/kalender">Kalender</nuxt-link>
          <nuxt-link to="/faq">FAQ</nuxt-link>
          <nuxt-link to="/inschrijven">Inschrijven</nuxt-link>
        </nav>
        <div class="flex flex-row sm:flex-col justify-between sm:gap-4">
          <nav class="flex flex-col gap-4">
            <nuxt-link to="/clubreglement">Clubreglement</nuxt-link>
            <nuxt-link href="https://www.gymfed.be/verzekeringen" :external="true" target="_blank"
              >Verzekeringen</nuxt-link
            >
            <nuxt-link href="https://www.gymfed.be/privacy" :external="true" target="_blank"
              >Privacyverklaring</nuxt-link
            >
          </nav>
          <nuxt-link href="https://www.gymfed.be" :external="true" target="_blank">
            <img
              class="shadow-none!"
              src="~/assets/images/gymfed.png"
              alt="Gymfed logo"
              width="120"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between text-center text-sm gap-4">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} Hamse Turnvereniging. Alle rechten voorbehouden.
        </div>
        <div class="website-by">
          Website door
          <nuxt-link href="https://steffbeckers.com/nl" :external="true" target="_blank"
            >Steff Beckers</nuxt-link
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
