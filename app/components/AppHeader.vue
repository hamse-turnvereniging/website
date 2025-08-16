<template>
  <header class="z-10">
    <div class="flex items-center justify-between max-w-6xl mx-auto px-8 h-20">
      <div class="w-[160px] h-full">
        <NuxtLink to="/">
          <!-- TODO: Check logo size + add shadow? -->
          <img
            class="absolute top-4 shadow-none!"
            src="~/assets/images/logo_black_background.png"
            alt="Hamse Turnvereniging logo"
            width="140"
            height="140"
          />
        </NuxtLink>
      </div>
      <nav class="flex gap-2">
        <NuxtLink class="p-4 text-center" to="/">
          <div>Welkom</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Welkom</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/aanbod">
          <div>Aanbod</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Aanbod</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/kalender">
          <div>Kalender</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Kalender</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/faq">
          <div>FAQ</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">FAQ</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/inschrijven">
          <div>Inschrijven</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Inschrijven</div>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference "./../assets/css/main.css";

header {
  @apply bg-neutral-900 text-white shadow-lg;

  nav {
    a {
      @apply text-white;

      &.router-link-active {
        @apply text-primary font-bold;
      }
    }
  }
}
</style>
