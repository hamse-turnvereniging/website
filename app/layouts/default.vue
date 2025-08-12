<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <nuxt-loading-indicator />
  <app-header class="flex-initial" />
  <main class="flex-auto">
    <div class="flex flex-col max-w-[1600px] mx-auto overflow-hidden">
      <slot />
    </div>
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
