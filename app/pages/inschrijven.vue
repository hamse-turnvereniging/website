<script lang="ts" setup>
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const groups = ref(["Turnen", "Trampoline", "BBB", "Callanetics", "Net-voetbal heren"]);
const locations = ref(["'t Vlietje (Kwaadmechelen)", "Kristoffelheem (Oostham)"]);
const genders = ref(["Man", "Vrouw", "X"]);
const parentsGroups = ref(["Turnen", "Trampoline"]);
const emergencyContactGroups = ref(["BBB", "Callanetics", "Net-voetbal heren"]);

const schema = v.object({
  group: v.string(),
  location: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  gender: v.string(),
  dateOfBirth: v.string(),
  nationality: v.string(),
  address: v.object({
    streetName: v.string(),
    houseNumber: v.string(),
    postalCode: v.string(),
    city: v.string(),
  }),
  phoneNumber: v.string(),
  email: v.pipe(v.string(), v.email("Ongeldig e-mailadres")),
  emergencyContact: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
  }),
  parent1: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.pipe(v.string(), v.email("Ongeldig e-mailadres")),
  }),
  parent2: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.pipe(v.string(), v.email("Ongeldig e-mailadres")),
  }),
  paymentCheck: v.boolean(),
  photosCheck: v.boolean(),
  rulesCheck: v.boolean(),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  group: undefined,
  location: undefined,
  firstName: "",
  lastName: "",
  gender: undefined,
  dateOfBirth: "",
  nationality: "",
  addres: {
    streetName: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  },
  phoneNumber: "",
  email: "",
  emergencyContact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  parent1: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  parent2: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  paymentCheck: false,
  photosCheck: true,
  rulesCheck: false,
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
  <section class="max-w-4xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-3">
      <h2>Schrijf je in!</h2>
      <p>
        Wil je graag lid worden van onze turnclub? Fantastisch!<br />
        Schrijf je hier in en sluit je aan bij onze sportieve en gezellige groep.
      </p>
      <p>
        Je gegevens worden enkel en alleen gedeeld met het bestuur van de Hamse Turnvereniging en
        <NuxtLink href="https://www.gymfed.be" :external="true"
          >Gymfed (Gymnastiekfederatie Vlaanderen)</NuxtLink
        >, i.v.m. je inschrijving en verplichte verzekering.
      </p>
    </div>
    <UForm :schema :state @submit="onSubmit">
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
          <h3>Persoonlijke gegevens</h3>
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
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Adres</h3>
          <div class="flex flex-row gap-6">
            <UFormField class="flex-1" label="Straatnaam" name="addressStreet" :required="true">
              <UInput
                v-model="state.addres.streetName"
                class="w-full"
                size="xl"
                placeholder="Straat"
              />
            </UFormField>
            <UFormField
              class="flex-1"
              label="Huisnummer"
              name="addressHouseNumber"
              :required="true"
            >
              <UInput
                v-model="state.addres.houseNumber"
                class="w-full"
                size="xl"
                placeholder="Huisnummer"
              />
            </UFormField>
          </div>
          <div class="flex flex-row gap-6">
            <UFormField class="flex-1" label="Postcode" name="addressPostalCode" :required="true">
              <UInput
                v-model="state.addres.postalCode"
                class="w-full"
                size="xl"
                placeholder="Postcode"
              />
            </UFormField>
            <UFormField class="flex-1" label="Stad/gemeente" name="addressCity" :required="true">
              <UInput
                v-model="state.addres.city"
                class="w-full"
                size="xl"
                placeholder="Stad/gemeente"
              />
            </UFormField>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-6">
          <h3>Contactgegevens</h3>
          <div class="flex flex-row gap-6">
            <UFormField class="flex-1" label="Telefoonnummer" name="phoneNumber" :required="true">
              <UInput
                v-model="state.phoneNumber"
                class="w-full"
                size="xl"
                placeholder="Telefoonnummer"
              />
            </UFormField>
            <UFormField class="flex-1" label="E-mailadres" name="email" :required="true">
              <UInput v-model="state.email" class="w-full" size="xl" placeholder="E-mailadres" />
            </UFormField>
          </div>
          <div
            v-if="state.group && emergencyContactGroups.includes(state.group)"
            class="flex flex-row gap-6"
          >
            <div class="flex flex-1 flex-col gap-3">
              <h4>Wie mogen we bellen in geval van nood?</h4>
              <div class="flex flex-row gap-6">
                <UFormField
                  class="flex-1"
                  label="Voornaam"
                  name="emergencyContactFirstName"
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
                  name="emergencyContactLastName"
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
                  name="emergencyContactPhoneNumber"
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
          </div>
          <div
            v-if="state.group && parentsGroups.includes(state.group)"
            class="flex flex-row gap-6"
          >
            <div class="flex flex-1 flex-col gap-4">
              <h4>Ouder 1</h4>
              <div class="flex flex-row gap-6">
                <UFormField
                  class="flex-1"
                  label="Voornaam"
                  name="parent1FirstName"
                  :required="true"
                >
                  <UInput
                    v-model="state.parent1.firstName"
                    class="w-full"
                    size="xl"
                    placeholder="Voornaam"
                  />
                </UFormField>
                <UFormField class="flex-1" label="Naam" name="parent1LastName" :required="true">
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
                  name="parent1PhoneNumber"
                  :required="true"
                >
                  <UInput
                    v-model="state.parent1.phoneNumber"
                    class="w-full"
                    size="xl"
                    placeholder="Telefoonnummer"
                  />
                </UFormField>
                <UFormField class="flex-1" label="E-mailadres" name="parent1Email" :required="true">
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
              <h4>Ouder 2</h4>
              <div class="flex flex-row gap-6">
                <UFormField class="flex-1" label="Voornaam" name="parent2FirstName">
                  <UInput
                    v-model="state.parent2.firstName"
                    class="w-full"
                    size="xl"
                    placeholder="Voornaam"
                  />
                </UFormField>
                <UFormField class="flex-1" label="Naam" name="parent2LastName">
                  <UInput
                    v-model="state.parent2.lastName"
                    class="w-full"
                    size="xl"
                    placeholder="Naam"
                  />
                </UFormField>
              </div>
              <div class="flex flex-row gap-6">
                <UFormField class="flex-1" label="Telefoonnummer" name="parent2PhoneNumber">
                  <UInput
                    v-model="state.parent2.phoneNumber"
                    class="w-full"
                    size="xl"
                    placeholder="Telefoonnummer"
                  />
                </UFormField>
                <UFormField class="flex-1" label="E-mailadres" name="parent2Email">
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
        <hr />
        <div class="flex flex-col gap-6">
          <h3>Betaalgegevens lidgeld</h3>
          <div class="flex flex-col gap-3">
            <p>Rekeningnummer: BE69 0682 0939 9078</p>
            <p>
              Mededeling: {{ state.lastName != "" ? state.lastName : "Naam" }}
              {{ state.firstName != "" ? state.lastName : "Voornaam" }}
            </p>
          </div>
          <UCheckbox
            v-model="state.paymentCheck"
            label="Ik heb reeds betaald of de betaalgegevens zorgvuldig genoteerd"
            description="(te betalen binnen 14 dagen na inschrijving)"
            size="xl"
            :required="true"
          />
        </div>
        <hr />
        <div class="flex flex-col gap-3">
          <UCheckbox
            v-model="state.photosCheck"
            label="Foto's van lid mogen gepubliceerd worden"
            size="xl"
          />
          <UCheckbox v-model="state.rulesCheck" size="xl" :required="true">
            <template #label
              >Ik heb
              <NuxtLink to="clubreglement" target="_blank">het clubreglement</NuxtLink> gelezen en
              ga hiermee akkoord.</template
            >
          </UCheckbox>
        </div>
        <UButton type="submit" size="xl" color="secondary">Inschrijving verzenden</UButton>
      </div>
    </UForm>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  background-image: url("https://placehold.co/1600x340");
}

hr {
  @apply border-neutral-50;
}
</style>
