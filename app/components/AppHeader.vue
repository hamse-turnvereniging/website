<template>
  <header class="z-10 shadow-lg">
    <div class="flex items-center justify-between max-w-6xl mx-auto px-8 h-20">
      <div class="w-[160px] h-full">
        <!-- TODO: Check logo size + add shadow? -->
        <img
          class="absolute top-4"
          src="~/assets/images/logo_black_background.png"
          alt="Hamse Turnvereniging logo"
          width="140"
          height="140"
        />
      </div>
      <nav class="flex gap-2">
        <NuxtLink class="p-4 text-center" to="/">
          <div>Welkom</div>
          <div class="h-0 font-bold invisible">Welkom</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/aanbod">
          <div>Aanbod</div>
          <div class="h-0 font-bold invisible">Aanbod</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/kalender">
          <div>Kalender</div>
          <div class="h-0 font-bold invisible">Kalender</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/faq">
          <div>FAQ</div>
          <div class="h-0 font-bold invisible">FAQ</div>
        </NuxtLink>
        <NuxtLink class="p-4 text-center" to="/inschrijven">
          <div>Inschrijven</div>
          <div class="h-0 font-bold invisible">Inschrijven</div>
        </NuxtLink>
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
