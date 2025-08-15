<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-6 py-[120px]">
      <h1>Inschrijven</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Voor welke groep wil je inschrijven?</h2>
      <select name="groep">
        <option value="Turnen">Turnen</option>
        <option value="Trampoline">Trampoline</option>
        <option value="BBB">BBB</option>
        <option value="Callanetics">Callanetics</option>
        <option value="Net-voetbal heren">Net-voetbal heren</option>
      </select>
    </div>
  </section>
</template>

<style scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
}
</style>
