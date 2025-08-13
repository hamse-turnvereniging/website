<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <nuxt-loading-indicator />
  <app-header class="flex-initial" />
  <main class="flex-auto flex flex-col">
    <slot />
  </main>
  <app-footer class="flex-initial" />
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}

body {
  overflow-y: scroll;
}

#__nuxt {
  display: flex;
  flex-direction: column;
}
</style>
