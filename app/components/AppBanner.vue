<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <nuxt-link
    v-if="route.path !== '/lesgever-bbb'"
    to="/lesgever-bbb"
    class="bg-primary w-full px-8 py-2 text-center font-semibold text-gray-700!"
  >
    <div class="flex flex-row justify-center gap-2">
      <icon class="mt-0.5 size-5" name="i-lucide-search" />
      Lesgever BBB gezocht in Oostham
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
