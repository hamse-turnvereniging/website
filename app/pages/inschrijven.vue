<script lang="ts" setup>
import { groupPrice } from "#shared/data/inschrijving";
import { schema, initialState, type Schema } from "#shared/schemas/inschrijving";
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

const genders = ref(["Man", "Vrouw", "X"]);

const state = useLocalStorage("inschrijvingsformulier", initialState);

const dateOfBirth = computed(() => {
  if (!state.value.dateOfBirth || state.value.dateOfBirth.length != 10) {
    return null;
  }

  const [day, month, year] = state.value.dateOfBirth.split("/").map(Number);

  return new Date(year, month - 1, day);
});

const yearsYoung = computed(() => {
  if (!dateOfBirth.value) return null;

  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.value.getFullYear();
  const m = today.getMonth() - dateOfBirth.value.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.value.getDate())) {
    age--;
  }

  return age;
});

const is60PlusAtEndOfThisYear = computed(
  () => yearsYoung.value && yearsYoung.value && yearsYoung.value >= 59
);

const amount = computed(() => groupPrice[state.value.group]);

const discount = computed(() => (is60PlusAtEndOfThisYear.value ? 5 : 0));

const discountedAmount = computed(() =>
  amount.value && discount.value ? amount.value - discount.value : null
);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/inschrijven", {
    method: "POST",
    body: event.data,
  });

  const errorToast: Partial<Toast> = {
    title: "Mislukt!",
    description:
      "Er ging iets mis tijdens het verzenden van je inschrijving. Probeer het later even opnieuw.",
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

const resetModalOpen = ref(false);

function resetForm() {
  Object.assign(state.value, initialState);
  form.value?.clear();
  resetModalOpen.value = false;
  window.scrollTo({ behavior: "smooth", top: 0 });
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
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Schrijf je in!</h2>
      <p>
        Wil je graag lid worden van onze turnclub? Fantastisch!<br />
        Schrijf je hier in en sluit je aan bij onze sportieve en gezellige groep.
      </p>
    </div>
    <UForm ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3>Voor welke groep wil je inschrijven?</h3>
          <div class="flex gap-6">
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
            <div class="flex gap-6">
              <UFormField class="flex-1" label="Voornaam" name="firstName" :required="true">
                <UInput v-model="state.firstName" class="w-full" size="xl" placeholder="Voornaam" />
              </UFormField>
              <UFormField class="flex-1" label="Naam" name="lastName" :required="true">
                <UInput v-model="state.lastName" class="w-full" size="xl" placeholder="Naam" />
              </UFormField>
            </div>
            <div class="flex gap-6">
              <UFormField class="flex-1" label="Gender" name="gender" :required="true">
                <USelect
                  v-model="state.gender"
                  :items="genders"
                  size="xl"
                  class="w-full"
                  placeholder="Man / Vrouw / X"
                />
              </UFormField>
              <div class="flex flex-col gap-1">
                <UFormField
                  class="flex-1"
                  label="Geboortedatum"
                  name="dateOfBirth"
                  :required="true"
                >
                  <UInput
                    v-model="state.dateOfBirth"
                    v-maska="'##/##/####'"
                    class="w-full"
                    size="xl"
                    placeholder="dd/mm/jjjj"
                  />
                </UFormField>
                <span class="text-xs" v-if="yearsYoung != null">{{ yearsYoung }} jaar jong</span>
              </div>
              <UFormField class="flex-1" label="Nationaliteit" name="nationality" :required="true">
                <UInput
                  v-model="state.nationality"
                  class="w-full"
                  size="xl"
                  placeholder="Nationaliteit"
                />
              </UFormField>
            </div>
            <div
              v-if="
                !!state.group &&
                (state.group === 'Turnen - 1ste kleuterklas' ||
                  state.group === 'Turnen - 2de en 3de kleuterklas' ||
                  state.group === 'Turnen - 1ste, 2de en 3de leerjaar' ||
                  state.group === 'Turnen - 4ste, 5de en 6de leerjaar' ||
                  state.group === 'Trampoline')
              "
              class="flex flex-col gap-4"
            >
              <UFormField name="siblingsCheck">
                <UCheckbox
                  v-model="state.siblingsCheck"
                  label="Ik wil graag nog een broer of zus inschrijven"
                  size="xl"
                ></UCheckbox>
              </UFormField>
              <div v-if="state.siblingsCheck" class="flex flex-col gap-4">
                <h4>Broer(s) en/of zus(sen)</h4>
                <!-- TODO: Implement -->
              </div>
            </div>
            <h4>Adres</h4>
            <div class="flex gap-6">
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
            <div class="flex gap-6">
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
            <div
              v-if="
                !!state.group &&
                (state.group === 'Turnen - 12+' ||
                  state.group === 'BBB' ||
                  state.group === 'Callanetics' ||
                  state.group === 'Net-voetbal heren')
              "
              class="flex flex-1 flex-col gap-4"
            >
              <h4>Contactgegevens</h4>
              <div class="flex gap-6">
                <UFormField
                  class="flex-1"
                  label="Telefoonnummer"
                  name="phoneNumber"
                  :required="
                    !!state.group &&
                    (state.group === 'Turnen - 12+' ||
                      state.group === 'BBB' ||
                      state.group === 'Callanetics' ||
                      state.group === 'Net-voetbal heren')
                  "
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
                  :required="
                    !!state.group &&
                    (state.group === 'Turnen - 12+' ||
                      state.group === 'BBB' ||
                      state.group === 'Callanetics' ||
                      state.group === 'Net-voetbal heren')
                  "
                >
                  <UInput
                    v-model="state.email"
                    class="w-full"
                    size="xl"
                    placeholder="E-mailadres"
                  />
                </UFormField>
              </div>
              <h5>Wie mogen we bellen in geval van nood?</h5>
              <div class="flex gap-6">
                <UFormField
                  class="flex-1"
                  label="Voornaam"
                  name="emergencyContact.firstName"
                  :required="true"
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
                  :required="true"
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
                  :required="true"
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
            <div
              v-if="
                !!state.group &&
                (state.group === 'Turnen - 1ste kleuterklas' ||
                  state.group === 'Turnen - 2de en 3de kleuterklas' ||
                  state.group === 'Turnen - 1ste, 2de en 3de leerjaar' ||
                  state.group === 'Turnen - 4ste, 5de en 6de leerjaar' ||
                  state.group === 'Trampoline')
              "
              class="flex flex-col gap-4"
            >
              <div class="flex flex-1 flex-col gap-4">
                <h4>Contact ouder 1</h4>
                <div class="flex gap-6">
                  <UFormField
                    class="flex-1"
                    label="Voornaam"
                    name="parent1.firstName"
                    :required="true"
                  >
                    <UInput
                      v-model="state.parent1.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </UFormField>
                  <UFormField class="flex-1" label="Naam" name="parent1.lastName" :required="true">
                    <UInput
                      v-model="state.parent1.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </UFormField>
                </div>
                <div class="flex gap-6">
                  <UFormField
                    class="flex-1"
                    label="Telefoonnummer"
                    name="parent1.phoneNumber"
                    :required="true"
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
                    :required="true"
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
                <h4>Contact ouder 2</h4>
                <div class="flex gap-6">
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
                <div class="flex gap-6">
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
          <table>
            <tbody>
              <tr>
                <td width="160px">Rekeningnummer:</td>
                <td class="font-semibold py-1">BE69 0682 0939 9078</td>
              </tr>
              <tr v-if="amount">
                <td>Bedrag:</td>
                <td class="font-semibold py-1">
                  <span v-if="discount"
                    ><span class="font-normal line-through mr-1">&euro; {{ amount }}</span> &euro;
                    {{ discountedAmount }} (<span v-if="is60PlusAtEndOfThisYear"
                      >{{ discount }} euro korting voor 60+</span
                    >)</span
                  >
                  <span v-else>&euro; {{ amount }}</span>
                </td>
              </tr>
              <tr>
                <td>Mededeling:</td>
                <td class="font-semibold py-1">
                  {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                  {{ state.lastName != "" ? state.lastName : "Naam" }}
                </td>
              </tr>
            </tbody>
          </table>
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
          <UModal v-model:open="resetModalOpen">
            <UButton label="Gegevens wissen" type="button" variant="ghost" color="error" />
            <template #content>
              <div class="flex flex-col gap-3 p-6">
                <div class="flex justify-between">
                  <h3>Gegevens wissen</h3>
                  <UButton
                    icon="i-lucide-x"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    @click="resetModalOpen = false"
                  />
                </div>
                <p>Ben je zeker dat je de gegevens van het inschrijvingsformulier wilt wissen?</p>
                <div class="flex gap-3 justify-end">
                  <UButton
                    label="Annuleren"
                    variant="ghost"
                    size="lg"
                    color="neutral"
                    @click="resetModalOpen = false"
                  />
                  <UButton label="Wissen" size="lg" color="error" @click="resetForm()" />
                </div>
              </div>
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
