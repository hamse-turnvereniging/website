<script lang="ts" setup>
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const groups = ref(["Turnen", "Trampoline", "BBB", "Callanetics", "Net-voetbal heren"]);
const genderIdentities = ref(["Man", "Vrouw", "X", "Zeg ik liever niet"]);

const schema = v.object({
  group: v.pipe(v.string()),
  firstName: v.pipe(v.string()),
  lastName: v.pipe(v.string()),
  dateOfBirth: v.pipe(v.string()),
  nationality: v.pipe(v.string()),
  genderIdentity: v.pipe(v.string()),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  group: "Turnen",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  genderIdentity: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  toast.add({ title: "Gelukt!", description: "Je inschrijving is verzonden.", color: "success" });
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-6 py-[120px]">
      <h1>Inschrijven</h1>
    </div>
  </section>
  <section class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Schrijf je in!</h2>
      <p>
        Wil je graag lid worden van onze turnclub? Fantastisch!<br />
        Schrijf je hier in en sluit je aan bij onze sportieve en gezellige groep.
      </p>
    </div>
    <UForm :schema :state @submit="onSubmit">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
          <h3>Voor welke groep wil je inschrijven?</h3>
          <div class="flex flex-row gap-8">
            <UFormField class="flex-1" label="Groep" name="groep">
              <USelect v-model="state.group" :items="groups" size="xl" class="w-full" />
            </UFormField>
            <div class="flex-1"></div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h3>Persoonlijke gegevens</h3>
          <div class="flex flex-row gap-8">
            <UFormField class="flex-1" label="Voornaam" name="voornaam" :required="true">
              <UInput v-model="state.firstName" class="w-full" size="xl" placeholder="Voornaam" />
            </UFormField>
            <UFormField class="flex-1" label="Naam" name="naam" :required="true">
              <UInput v-model="state.lastName" class="w-full" size="xl" placeholder="Naam" />
            </UFormField>
          </div>
          <div class="flex flex-row gap-8">
            <UFormField class="flex-1" label="Geboortedatum" name="geboortedatum" :required="true">
              <UInput
                v-model="state.dateOfBirth"
                class="w-full"
                size="xl"
                placeholder="dd/mm/jjjj"
              />
            </UFormField>
            <UFormField class="flex-1" label="Nationaliteit" name="nationaliteit" :required="true">
              <UInput
                v-model="state.nationality"
                class="w-full"
                size="xl"
                placeholder="Nationaliteit"
              />
            </UFormField>
            <UFormField class="flex-1" label="Genderidentiteit" name="geslacht">
              <USelect
                v-model="state.genderIdentity"
                :items="genderIdentities"
                size="xl"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
        <UButton type="submit" size="xl" color="secondary">Inschrijving verzenden</UButton>
      </div>
    </UForm>
  </section>
</template>

<style scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
}
</style>
