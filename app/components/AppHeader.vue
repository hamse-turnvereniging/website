<template>
  <header>
    <div class="flex items-center justify-between max-w-6xl mx-auto px-6 h-20">
      <div class="w-[160px] h-full">
        <!-- TODO: Check logo size -->
        <img
          class="absolute top-4"
          src="~/assets/images/logo_black_background.png"
          alt="Hamse Turnvereniging logo"
          width="160"
          height="160"
        />
      </div>
      <nav class="flex gap-6">
        <NuxtLink to="/">Welkom</NuxtLink>
        <NuxtLink to="/aanbod">Aanbod</NuxtLink>
        <NuxtLink to="/kalender">Kalender</NuxtLink>
        <NuxtLink to="/faq">FAQ</NuxtLink>
        <NuxtLink to="/inschrijven">Inschrijven</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="css" scoped>
header {
  background-color: #202020;
}

nav {
  color: #ffffff;
}

nav a.router-link-active {
  color: #a0ef94;
  font-weight: bold;
}
</style>
