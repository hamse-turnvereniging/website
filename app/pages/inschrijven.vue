<script lang="ts" setup>
import { schema, initialState, type Schema } from "../../shared/schemas/inschrijven";
import type { FormErrorEvent, FormSubmitEvent, SelectItem } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { useLocalStorage } from "@vueuse/core";
import { vMaska } from "maska/vue";

const form = useTemplateRef("form");

const groups = ref<SelectItem[]>([
  {
    type: "label",
    label: "Turnen",
  },
  {
    label: "1ste kleuterklas",
    value: "Turnen - 1ste kleuterklas",
  },
  {
    label: "2de en 3de kleuterklas",
    value: "Turnen - 2de en 3de kleuterklas",
  },
  {
    label: "1ste, 2de en 3de leerjaar",
    value: "Turnen - 1ste, 2de en 3de leerjaar",
  },
  {
    label: "4ste, 5de en 6de leerjaar",
    value: "Turnen - 4ste, 5de en 6de leerjaar",
  },
  {
    label: "12+",
    value: "Turnen - 12+",
  },
  { type: "separator" },
  {
    label: "Trampoline (vanaf 1ste leerjaar)",
    value: "Trampoline",
  },
  "BBB",
  "Callanetics",
  "Net-voetbal heren",
]);

const parentsGroups = ref([
  "Turnen - 1ste kleuterklas",
  "Turnen - 2de en 3de kleuterklas",
  "Turnen - 1ste, 2de en 3de leerjaar",
  "Turnen - 4ste, 5de en 6de leerjaar",
  "Trampoline",
]);

const emergencyContactGroups = ref(["Turnen - 12+", "BBB", "Callanetics", "Net-voetbal heren"]);

const locations = ref<SelectItem[]>([
  {
    label: "Kristoffelheem (Oostham)",
    value: "Kristoffelheem",
  },
  {
    label: "'t Vlietje (Kwaadmechelen)",
    value: "'t Vlietje",
  },
]);

// TODO: Check if location is available based on group
// const locationGroups = ref<{ [location: string]: string[] }>({
//   Kristoffelheem: [
//     "Turnen - 1ste kleuterklas",
//     "Turnen - 2de en 3de kleuterklas",
//     "Turnen - 1ste, 2de en 3de leerjaar",
//     "Turnen - 4ste, 5de en 6de leerjaar",
//     "Trampoline",
//     "Turnen - 12+",
//     // TODO: Is this correct?
//     "BBB",
//     "Callanetics",
//     "Net-voetbal heren",
//   ],
//   "'t Vlietje": [
//     "Turnen - 1ste kleuterklas",
//     "Turnen - 2de en 3de kleuterklas",
//     "Turnen - 1ste, 2de en 3de leerjaar",
//   ],
// });

const genders = ref(["Man", "Vrouw", "X"]);

const state = useLocalStorage("inschrijvingsformulier", initialState);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/inschrijven", {
    method: "POST",
    body: event.data,
  });

  const errorToast: Partial<Toast> = {
    title: "Mislukt!",
    description: "Er ging iets mis tijdens het verzenden van je inschrijving.",
    color: "error",
  };

  if (!response.success) {
    console.error(response);
    toast.add(errorToast);

    return;
  }

  toast.add({ title: "Gelukt!", description: "Je inschrijving is verzonden.", color: "primary" });

  resetForm();
}

function resetForm() {
  state.value = null;
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id);
    element?.focus();
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-6 py-[120px]">
      <h1>Inschrijven</h1>
    </div>
  </section>
  <section class="max-w-4xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Schrijf je in!</h2>
      <p>
        Wil je graag lid worden van onze turnclub? Fantastisch!<br />
        Schrijf je hier in en sluit je aan bij onze sportieve en gezellige groep.
      </p>
    </div>
    <!-- TODO: Remove -->
    {{ form?.getErrors() }}
    <UForm ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3>Voor welke groep wil je inschrijven?</h3>
          <div class="flex flex-row gap-6">
            <UFormField class="flex-1" label="Groep" name="group" :required="true">
              <USelect
                v-model="state.group"
                :items="groups"
                size="xl"
                class="w-full"
                placeholder="Maak je keuze"
              />
            </UFormField>
            <UFormField class="flex-1" label="Sporthal" name="location" :required="true">
              <USelect
                v-model="state.location"
                :items="locations"
                size="xl"
                class="w-full"
                placeholder="Maak je keuze"
              />
            </UFormField>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Gegevens lid</h3>
          <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-6">
              <UFormField class="flex-1" label="Voornaam" name="firstName" :required="true">
                <UInput v-model="state.firstName" class="w-full" size="xl" placeholder="Voornaam" />
              </UFormField>
              <UFormField class="flex-1" label="Naam" name="lastName" :required="true">
                <UInput v-model="state.lastName" class="w-full" size="xl" placeholder="Naam" />
              </UFormField>
            </div>
            <div class="flex flex-row gap-6">
              <UFormField class="flex-1" label="Gender" name="gender" :required="true">
                <USelect
                  v-model="state.gender"
                  :items="genders"
                  size="xl"
                  class="w-full"
                  placeholder="Man / Vrouw / X"
                />
              </UFormField>
              <UFormField class="flex-1" label="Geboortedatum" name="dateOfBirth" :required="true">
                <UInput
                  v-model="state.dateOfBirth"
                  v-maska="'##/##/####'"
                  class="w-full"
                  size="xl"
                  placeholder="dd/mm/jjjj"
                />
              </UFormField>
              <UFormField class="flex-1" label="Nationaliteit" name="nationality" :required="true">
                <UInput
                  v-model="state.nationality"
                  class="w-full"
                  size="xl"
                  placeholder="Nationaliteit"
                />
              </UFormField>
            </div>
            <h4>Adres</h4>
            <div class="flex flex-row gap-6">
              <UFormField
                class="flex-1"
                label="Straatnaam"
                name="address.streetName"
                :required="true"
              >
                <UInput
                  v-model="state.address.streetName"
                  class="w-full"
                  size="xl"
                  placeholder="Straat"
                />
              </UFormField>
              <UFormField
                class="flex-1"
                label="Huisnummer"
                name="address.houseNumber"
                :required="true"
              >
                <UInput
                  v-model="state.address.houseNumber"
                  class="w-full"
                  size="xl"
                  placeholder="Huisnummer"
                />
              </UFormField>
            </div>
            <div class="flex flex-row gap-6">
              <UFormField
                class="flex-1"
                label="Postcode"
                name="address.postalCode"
                :required="true"
              >
                <UInput
                  v-model="state.address.postalCode"
                  class="w-full"
                  size="xl"
                  placeholder="Postcode"
                />
              </UFormField>
              <UFormField class="flex-1" label="Stad/gemeente" name="address.city" :required="true">
                <UInput
                  v-model="state.address.city"
                  class="w-full"
                  size="xl"
                  placeholder="Stad/gemeente"
                />
              </UFormField>
            </div>
            <h4>Contact</h4>
            <div class="flex flex-row gap-6">
              <UFormField
                class="flex-1"
                label="Telefoonnummer"
                name="phoneNumber"
                :required="!!state.group && emergencyContactGroups.includes(state.group)"
              >
                <UInput
                  v-model="state.phoneNumber"
                  class="w-full"
                  size="xl"
                  placeholder="Telefoonnummer"
                />
              </UFormField>
              <UFormField
                class="flex-1"
                label="E-mailadres"
                name="email"
                :required="!!state.group && emergencyContactGroups.includes(state.group)"
              >
                <UInput v-model="state.email" class="w-full" size="xl" placeholder="E-mailadres" />
              </UFormField>
            </div>
            <!-- TODO: v-if="state.group && emergencyContactGroups.includes(state.group)" -->
            <div class="flex flex-row gap-6">
              <div class="flex flex-1 flex-col gap-3">
                <h5>Wie mogen we bellen in geval van nood?</h5>
                <div class="flex flex-row gap-6">
                  <UFormField
                    class="flex-1"
                    label="Voornaam"
                    name="emergencyContact.firstName"
                    :required="!!state.group && emergencyContactGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.emergencyContact.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </UFormField>
                  <UFormField
                    class="flex-1"
                    label="Naam"
                    name="emergencyContact.lastName"
                    :required="!!state.group && emergencyContactGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.emergencyContact.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </UFormField>
                  <UFormField
                    class="flex-1"
                    label="Telefoonnummer"
                    name="emergencyContact.phoneNumber"
                    :required="!!state.group && emergencyContactGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.emergencyContact.phoneNumber"
                      class="w-full"
                      size="xl"
                      placeholder="Telefoonnummer"
                    />
                  </UFormField>
                </div>
              </div>
            </div>
            <!-- TODO: v-if="state.group && parentsGroups.includes(state.group)" -->
            <div class="flex flex-row gap-6">
              <div class="flex flex-1 flex-col gap-4">
                <h5>Ouder 1</h5>
                <div class="flex flex-row gap-6">
                  <UFormField
                    class="flex-1"
                    label="Voornaam"
                    name="parent1.firstName"
                    :required="!!state.group && parentsGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.parent1.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </UFormField>
                  <UFormField
                    class="flex-1"
                    label="Naam"
                    name="parent1.lastName"
                    :required="!!state.group && parentsGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.parent1.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </UFormField>
                </div>
                <div class="flex flex-row gap-6">
                  <UFormField
                    class="flex-1"
                    label="Telefoonnummer"
                    name="parent1.phoneNumber"
                    :required="!!state.group && parentsGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.parent1.phoneNumber"
                      class="w-full"
                      size="xl"
                      placeholder="Telefoonnummer"
                    />
                  </UFormField>
                  <UFormField
                    class="flex-1"
                    label="E-mailadres"
                    name="parent1.email"
                    :required="!!state.group && parentsGroups.includes(state.group)"
                  >
                    <UInput
                      v-model="state.parent1.email"
                      class="w-full"
                      size="xl"
                      placeholder="E-mailadres"
                    />
                  </UFormField>
                </div>
              </div>
              <div class="flex flex-1 flex-col gap-4">
                <h5>Ouder 2</h5>
                <div class="flex flex-row gap-6">
                  <UFormField class="flex-1" label="Voornaam" name="parent2.firstName">
                    <UInput
                      v-model="state.parent2.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </UFormField>
                  <UFormField class="flex-1" label="Naam" name="parent2.lastName">
                    <UInput
                      v-model="state.parent2.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </UFormField>
                </div>
                <div class="flex flex-row gap-6">
                  <UFormField class="flex-1" label="Telefoonnummer" name="parent2.phoneNumber">
                    <UInput
                      v-model="state.parent2.phoneNumber"
                      class="w-full"
                      size="xl"
                      placeholder="Telefoonnummer"
                    />
                  </UFormField>
                  <UFormField class="flex-1" label="E-mailadres" name="parent2.email">
                    <UInput
                      v-model="state.parent2.email"
                      class="w-full"
                      size="xl"
                      placeholder="E-mailadres"
                    />
                  </UFormField>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Betaalgegevens lidgeld</h3>
          <div class="flex flex-col gap-3">
            <p>Rekeningnummer: BE69 0682 0939 9078</p>
            <p>
              Mededeling: {{ state.lastName != "" ? state.lastName : "Naam" }}
              {{ state.firstName != "" ? state.firstName : "Voornaam" }}
            </p>
          </div>
          <UFormField name="paymentCheck">
            <UCheckbox
              v-model="state.paymentCheck"
              label="Ik heb reeds betaald of de betaalgegevens zorgvuldig genoteerd."
              description="(te betalen binnen 14 dagen na inschrijving)"
              size="xl"
            />
          </UFormField>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <UFormField name="photosCheck">
            <UCheckbox
              v-model="state.photosCheck"
              label="Foto's van lid mogen gepubliceerd worden."
              size="xl"
            />
          </UFormField>
          <UFormField name="rulesCheck">
            <UCheckbox v-model="state.rulesCheck" size="xl">
              <template #label
                >Ik heb het
                <NuxtLink to="clubreglement" target="_blank">clubreglement</NuxtLink> gelezen en ga
                hiermee akkoord.</template
              >
            </UCheckbox>
          </UFormField>
          <UFormField name="privacyCheck">
            <UCheckbox v-model="state.privacyCheck" size="xl">
              <template #label>
                Ik ben akkoord dat bovenstaande gegevens enkel en alleen gedeeld worden met het
                bestuur van de Hamse Turnvereniging en
                <NuxtLink href="https://www.gymfed.be" :external="true" target="_blank"
                  >Gymfed (Gymnastiekfederatie Vlaanderen)</NuxtLink
                >.
              </template>
            </UCheckbox>
          </UFormField>
        </div>
        <div class="flex flex-col gap-3">
          <UButton type="submit" size="xl" color="secondary">Inschrijving verzenden</UButton>
          <!-- TODO: Better modal layout -->
          <UModal
            :close="true"
            title="Gegevens wissen"
            description="Ben je zeker dat je de gegevens van het inschrijvingsformulier wilt wissen?"
          >
            <UButton label="Gegevens wissen" type="button" variant="ghost" color="error" />
            <template #body>
              <UButton label="Annuleren" variant="ghost" color="neutral" />
              <UButton label="Wissen" color="error" @click="resetForm" />
            </template>
          </UModal>
        </div>
      </div>
    </UForm>
  </section>
</template>

<style scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
}
</style>
