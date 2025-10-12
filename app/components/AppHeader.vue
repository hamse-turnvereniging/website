<script lang="ts" setup>
import { startOfDay, startOfToday } from "date-fns";

const route = useRoute();
const showWafels = computed(() => startOfToday() <= startOfDay(new Date("2025-11-09")));
</script>

<template>
  <header class="z-10">
    <div class="flex items-center justify-between max-w-6xl mx-auto px-8 h-16 md:h-20">
      <div class="w-[160px] h-full">
        <nuxt-link to="/">
          <img
            class="absolute top-4 shadow-none! w-[100px] h-[105px] md:w-[140px] md:h-[147px]"
            src="~/assets/images/logo_black_background_200px_shadow.png"
            alt="Hamse Turnvereniging logo"
          />
        </nuxt-link>
      </div>
      <nav class="hidden md:flex gap-2">
        <nuxt-link class="p-4 text-center" to="/">
          <div>Welkom</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Welkom</div>
        </nuxt-link>
        <nuxt-link class="p-4 text-center" to="/aanbod">
          <div>Aanbod</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Aanbod</div>
        </nuxt-link>
        <nuxt-link class="p-4 text-center" to="/kalender">
          <div>Kalender</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Kalender</div>
        </nuxt-link>
        <nuxt-link class="p-4 text-center" to="/faq">
          <div>FAQ</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">FAQ</div>
        </nuxt-link>
        <nuxt-link class="p-4 text-center" to="/inschrijven">
          <div>Inschrijven</div>
          <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Inschrijven</div>
        </nuxt-link>
        <div v-if="showWafels" class="flex items-center">
          <u-button
            to="/wafels"
            :color="route.path === '/wafels' ? 'primary' : 'secondary'"
            size="xl"
            >Wafels</u-button
          >
        </div>
      </nav>
      <u-slideover
        class="md:hidden"
        :ui="{ header: 'border-b-h bg-neutral-900', body: 'flex flex-col justify-center h-full' }"
      >
        <u-button
          class="absolute right-8 top-8 rounded-full aspect-square p-4 shadow-md hover:bg-primary-400!"
        >
          <u-icon class="size-8!" name="i-lucide-menu" />
        </u-button>
        <template #close="{ close }">
          <u-button
            class="absolute right-8 top-8 rounded-full aspect-square p-4 shadow-md hover:bg-primary-400!"
            @click="close()"
          >
            <u-icon class="size-8!" name="i-lucide-x" />
          </u-button>
        </template>
        <template #body="{ close }">
          <nav class="mobile flex flex-col gap-2">
            <nuxt-link class="p-4 text-center" to="/" @click="close()">
              <h3>Welkom</h3>
              <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Welkom</div>
            </nuxt-link>
            <nuxt-link class="p-4 text-center" to="/aanbod" @click="close()">
              <h3>Aanbod</h3>
              <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Aanbod</div>
            </nuxt-link>
            <nuxt-link class="p-4 text-center" to="/kalender" @click="close()">
              <h3>Kalender</h3>
              <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">Kalender</div>
            </nuxt-link>
            <nuxt-link class="p-4 text-center" to="/faq" @click="close()">
              <h3>FAQ</h3>
              <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">FAQ</div>
            </nuxt-link>
            <nuxt-link class="p-4 text-center" to="/inschrijven" @click="close()">
              <h3>Inschrijven</h3>
              <div aria-disabled="true" class="h-0 font-bold invisible" tabindex="-1">
                Inschrijven
              </div>
            </nuxt-link>
            <div v-if="showWafels" class="p-4 flex justify-center">
              <u-button
                to="/wafels"
                :color="route.path === '/wafels' ? 'primary' : 'secondary'"
                size="xl"
                ><h3 class="text-white!">Wafels</h3></u-button
              >
            </div>
          </nav>
        </template>
      </u-slideover>
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

<style>
@reference "./../assets/css/main.css";

nav.mobile {
  a {
    &:hover {
      h3 {
        @apply text-primary;
      }
    }

    &.router-link-active {
      h3 {
        @apply text-primary font-bold;
      }
    }
  }
}
</style>
