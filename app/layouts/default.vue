<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <nuxt-loading-indicator />
  <app-header class="flex-initial" />
  <main class="flex-auto flex flex-col">
    <slot />
  </main>
  <app-footer class="flex-initial" />
</template>
