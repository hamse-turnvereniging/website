<script lang="ts" setup>
import { genders, groupPrice, locationGroups } from "#shared/data/inschrijving";
import { schema, initialState, type Schema } from "#shared/schemas/inschrijving";
import type { FormErrorEvent, FormSubmitEvent, SelectItem } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { vMaska } from "maska/vue";

const form = useTemplateRef("form");
const state = useLocalStorage("inschrijvingsformulier", initialState, { mergeDefaults: true });

watch(state.value, (value) => {
  if (value.group && value.location) {
    if (!locationGroups[value.location]?.includes(value.group!)) {
      const newLocation = availableLocations.value[0]?.value as typeof state.value.location;

      toast.add({
        title: "Opgepast!",
        description: `${value.group} is niet beschikbaar in sporthal ${value.location}. Sporthal is aangepast naar ${newLocation}.`,
        color: "warning",
      });

      state.value.location = newLocation;
    }
  } else if (value.group && !value.location) {
    if (availableLocations.value.length === 1) {
      state.value.location = availableLocations.value[0]?.value as typeof state.value.location;
    }
  }
});

const groups: SelectItem[] = [
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
];

const locations = [
  {
    label: "Kristoffelheem (Oostham)",
    value: "Kristoffelheem",
  },
  {
    label: "'t Vlietje (Kwaadmechelen)",
    value: "'t Vlietje",
  },
];

const availableLocations = computed(() =>
  state.value.group
    ? locations.filter((x) => locationGroups[x.value]?.includes(state.value.group!))
    : locations
);

const dateOfBirth = computed(() => {
  if (!state.value.dateOfBirth || state.value.dateOfBirth.length != 10) {
    return null;
  }

  const [day, month, year] = state.value.dateOfBirth.split("/").map(Number);

  return new Date(year!, month! - 1, day);
});

const yearsOld = computed(() => {
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
  () => yearsOld.value && yearsOld.value && yearsOld.value >= 59
);

watch(is60PlusAtEndOfThisYear, (value) => {
  state.value.is60PlusAtEndOfThisYear = !!value;

  if (value && state.value.familyMember.check) {
    state.value.familyMember.check = false;
  }
});

const amount = computed(() => state.value.group && groupPrice[state.value.group]);

const discount = computed(() =>
  state.value.is60PlusAtEndOfThisYear || state.value.familyMember.check ? 5 : 0
);

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
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
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
    <u-form ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3>Voor welke groep wil je inschrijven?</h3>
          <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <u-form-field class="flex-1" label="Groep" name="group" :required="true">
              <u-select
                v-model="state.group"
                :items="groups"
                size="xl"
                class="w-full"
                placeholder="Maak je keuze"
              />
            </u-form-field>
            <u-form-field class="flex-1" label="Sporthal" name="location" :required="true">
              <u-select
                v-model="state.location"
                :items="availableLocations"
                size="xl"
                class="w-full"
                placeholder="Maak je keuze"
              />
            </u-form-field>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Gegevens lid</h3>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <u-form-field class="flex-1" label="Voornaam" name="firstName" :required="true">
                <u-input
                  v-model="state.firstName"
                  class="w-full"
                  size="xl"
                  placeholder="Voornaam"
                />
              </u-form-field>
              <u-form-field class="flex-1" label="Naam" name="lastName" :required="true">
                <u-input v-model="state.lastName" class="w-full" size="xl" placeholder="Naam" />
              </u-form-field>
            </div>
            <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <u-form-field class="flex-1" label="Gender" name="gender" :required="true">
                <u-select
                  v-model="state.gender"
                  :items="genders"
                  size="xl"
                  class="w-full"
                  placeholder="Man / Vrouw / X"
                />
              </u-form-field>
              <u-form-field
                class="flex-1"
                label="Geboortedatum"
                name="dateOfBirth"
                :required="true"
              >
                <u-input
                  v-model="state.dateOfBirth"
                  v-maska="'##/##/####'"
                  class="w-full"
                  size="xl"
                  placeholder="dd/mm/jjjj"
                />
              </u-form-field>
              <u-form-field
                class="flex-1"
                label="Nationaliteit"
                name="nationality"
                :required="true"
              >
                <u-input
                  v-model="state.nationality"
                  class="w-full"
                  size="xl"
                  placeholder="Nationaliteit"
                />
              </u-form-field>
            </div>
            <h4>Adres</h4>
            <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <u-form-field
                class="flex-1"
                label="Straatnaam"
                name="address.streetName"
                :required="true"
              >
                <u-input
                  v-model="state.address.streetName"
                  class="w-full"
                  size="xl"
                  placeholder="Straat"
                />
              </u-form-field>
              <u-form-field
                class="flex-1"
                label="Huisnummer"
                name="address.houseNumber"
                :required="true"
              >
                <u-input
                  v-model="state.address.houseNumber"
                  class="w-full"
                  size="xl"
                  placeholder="Huisnummer"
                />
              </u-form-field>
            </div>
            <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <u-form-field
                class="flex-1"
                label="Postcode"
                name="address.postalCode"
                :required="true"
              >
                <u-input
                  v-model="state.address.postalCode"
                  class="w-full"
                  size="xl"
                  placeholder="Postcode"
                />
              </u-form-field>
              <u-form-field
                class="flex-1"
                label="Stad/gemeente"
                name="address.city"
                :required="true"
              >
                <u-input
                  v-model="state.address.city"
                  class="w-full"
                  size="xl"
                  placeholder="Stad/gemeente"
                />
              </u-form-field>
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
              <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <u-form-field
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
                  <u-input
                    v-model="state.phoneNumber"
                    class="w-full"
                    size="xl"
                    placeholder="Telefoonnummer"
                  />
                </u-form-field>
                <u-form-field
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
                  <u-input
                    v-model="state.email"
                    class="w-full"
                    size="xl"
                    placeholder="E-mailadres"
                  />
                </u-form-field>
              </div>
              <h5>Wie mogen we bellen in geval van nood?</h5>
              <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <u-form-field
                  class="flex-1"
                  label="Voornaam"
                  name="emergencyContact.firstName"
                  :required="true"
                >
                  <u-input
                    v-model="state.emergencyContact.firstName"
                    class="w-full"
                    size="xl"
                    placeholder="Voornaam"
                  />
                </u-form-field>
                <u-form-field
                  class="flex-1"
                  label="Naam"
                  name="emergencyContact.lastName"
                  :required="true"
                >
                  <u-input
                    v-model="state.emergencyContact.lastName"
                    class="w-full"
                    size="xl"
                    placeholder="Naam"
                  />
                </u-form-field>
                <u-form-field
                  class="flex-1"
                  label="Telefoonnummer"
                  name="emergencyContact.phoneNumber"
                  :required="true"
                >
                  <u-input
                    v-model="state.emergencyContact.phoneNumber"
                    class="w-full"
                    size="xl"
                    placeholder="Telefoonnummer"
                  />
                </u-form-field>
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
                <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <u-form-field
                    class="flex-1"
                    label="Voornaam"
                    name="parent1.firstName"
                    :required="true"
                  >
                    <u-input
                      v-model="state.parent1.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </u-form-field>
                  <u-form-field
                    class="flex-1"
                    label="Naam"
                    name="parent1.lastName"
                    :required="true"
                  >
                    <u-input
                      v-model="state.parent1.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </u-form-field>
                </div>
                <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <u-form-field
                    class="flex-1"
                    label="Telefoonnummer"
                    name="parent1.phoneNumber"
                    :required="true"
                  >
                    <u-input
                      v-model="state.parent1.phoneNumber"
                      class="w-full"
                      size="xl"
                      placeholder="Telefoonnummer"
                    />
                  </u-form-field>
                  <u-form-field
                    class="flex-1"
                    label="E-mailadres"
                    name="parent1.email"
                    :required="true"
                  >
                    <u-input
                      v-model="state.parent1.email"
                      class="w-full"
                      size="xl"
                      placeholder="E-mailadres"
                    />
                  </u-form-field>
                </div>
              </div>
              <div class="flex flex-1 flex-col gap-4">
                <h4>Contact ouder 2</h4>
                <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <u-form-field class="flex-1" label="Voornaam" name="parent2.firstName">
                    <u-input
                      v-model="state.parent2.firstName"
                      class="w-full"
                      size="xl"
                      placeholder="Voornaam"
                    />
                  </u-form-field>
                  <u-form-field class="flex-1" label="Naam" name="parent2.lastName">
                    <u-input
                      v-model="state.parent2.lastName"
                      class="w-full"
                      size="xl"
                      placeholder="Naam"
                    />
                  </u-form-field>
                </div>
                <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <u-form-field class="flex-1" label="Telefoonnummer" name="parent2.phoneNumber">
                    <u-input
                      v-model="state.parent2.phoneNumber"
                      class="w-full"
                      size="xl"
                      placeholder="Telefoonnummer"
                    />
                  </u-form-field>
                  <u-form-field class="flex-1" label="E-mailadres" name="parent2.email">
                    <u-input
                      v-model="state.parent2.email"
                      class="w-full"
                      size="xl"
                      placeholder="E-mailadres"
                    />
                  </u-form-field>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Betaalgegevens lidgeld</h3>
          <div class="sm:hidden flex flex-col gap-4">
            <div class="flex flex-col">
              <div class="text-sm">Rekeningnummer</div>
              <div class="font-semibold py-1">BE69 0682 0939 9078</div>
            </div>
            <div v-if="amount" class="flex flex-col">
              <div class="text-sm">Bedrag</div>
              <div class="font-semibold py-1">
                <span v-if="discount"
                  ><span class="font-normal line-through mr-1">&euro; {{ amount }}</span> &euro;
                  {{ discountedAmount }} (<span v-if="is60PlusAtEndOfThisYear"
                    >{{ discount }} euro korting voor 60-plussers</span
                  ><span v-else="state.familyMember.check"
                    >{{ discount }} euro korting via gezinslid</span
                  >)</span
                >
                <span v-else>&euro; {{ amount }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Mededeling</div>
              <div class="font-semibold py-1">
                {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                {{ state.lastName != "" ? state.lastName : "Naam" }}
              </div>
            </div>
          </div>
          <table class="hidden sm:block">
            <tbody>
              <tr>
                <td class="text-sm" width="160px">Rekeningnummer</td>
                <td class="font-semibold py-1">BE69 0682 0939 9078</td>
              </tr>
              <tr v-if="amount">
                <td class="text-sm">Bedrag</td>
                <td class="font-semibold py-1">
                  <span v-if="discount"
                    ><span class="font-normal line-through mr-1">&euro; {{ amount }}</span> &euro;
                    {{ discountedAmount }} (<span v-if="is60PlusAtEndOfThisYear"
                      >{{ discount }} euro korting voor 60-plussers</span
                    ><span v-else="state.familyMember.check"
                      >{{ discount }} euro korting via gezinslid</span
                    >)</span
                  >
                  <span v-else>&euro; {{ amount }}</span>
                </td>
              </tr>
              <tr>
                <td class="text-sm">Mededeling</td>
                <td class="font-semibold py-1">
                  {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                  {{ state.lastName != "" ? state.lastName : "Naam" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!is60PlusAtEndOfThisYear" class="flex flex-col gap-4">
            <u-form-field name="familyMember.check">
              <u-checkbox
                v-model="state.familyMember.check"
                label="Ik heb een gezinslid dat reeds ingeschreven is."
                description="(ontvang 5 euro korting)"
                size="xl"
              ></u-checkbox>
            </u-form-field>
            <div v-if="state.familyMember.check" class="flex flex-1 flex-col gap-4">
              <h4>Gezinslid</h4>
              <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <u-form-field
                  class="flex-1"
                  label="Voornaam"
                  name="familyMember.firstName"
                  :required="true"
                >
                  <u-input
                    v-model="state.familyMember.firstName"
                    class="w-full"
                    size="xl"
                    placeholder="Voornaam"
                  />
                </u-form-field>
                <u-form-field
                  class="flex-1"
                  label="Naam"
                  name="familyMember.lastName"
                  :required="true"
                >
                  <u-input
                    v-model="state.familyMember.lastName"
                    class="w-full"
                    size="xl"
                    placeholder="Naam"
                  />
                </u-form-field>
              </div>
            </div>
          </div>
          <u-form-field name="paymentCheck">
            <u-checkbox
              v-model="state.paymentCheck"
              label="Ik heb reeds betaald of de betaalgegevens zorgvuldig genoteerd."
              description="(te betalen binnen 14 dagen na inschrijving)"
              size="xl"
            />
          </u-form-field>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <u-form-field name="photosCheck">
            <u-checkbox
              v-model="state.photosCheck"
              label="Foto's van lid mogen gepubliceerd worden."
              size="xl"
            />
          </u-form-field>
          <u-form-field name="rulesCheck">
            <u-checkbox v-model="state.rulesCheck" size="xl">
              <template #label
                >Ik heb het
                <nuxt-link to="clubreglement" target="_blank">clubreglement</nuxt-link> gelezen en
                ga hiermee akkoord.</template
              >
            </u-checkbox>
          </u-form-field>
          <u-form-field name="privacyCheck">
            <u-checkbox v-model="state.privacyCheck" size="xl">
              <template #label>
                Ik ben akkoord dat bovenstaande gegevens enkel en alleen gedeeld worden met het
                bestuur van de Hamse Turnvereniging en
                <nuxt-link href="https://www.gymfed.be" :external="true" target="_blank"
                  >Gymfed (Gymnastiekfederatie Vlaanderen)</nuxt-link
                >.
              </template>
            </u-checkbox>
          </u-form-field>
        </div>
        <div class="flex flex-col gap-3">
          <u-button type="submit" size="xl" color="secondary">Inschrijving verzenden</u-button>
          <u-modal v-model:open="resetModalOpen">
            <u-button label="Gegevens wissen" type="button" variant="ghost" color="error" />
            <template #content>
              <div class="flex flex-col gap-3 p-6">
                <div class="flex justify-between">
                  <h3>Gegevens wissen</h3>
                  <u-button
                    icon="i-lucide-x"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    @click="resetModalOpen = false"
                  />
                </div>
                <p>Ben je zeker dat je de gegevens van het inschrijvingsformulier wilt wissen?</p>
                <div class="flex gap-3 justify-end">
                  <u-button
                    label="Annuleren"
                    variant="ghost"
                    size="lg"
                    color="neutral"
                    @click="resetModalOpen = false"
                  />
                  <u-button label="Wissen" size="lg" color="error" @click="resetForm()" />
                </div>
              </div>
            </template>
          </u-modal>
        </div>
      </div>
    </u-form>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
