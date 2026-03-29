<script lang="ts" setup>
import {
  campPrice,
  initialState,
  schema,
  schoolYears,
  type Schema,
} from "#shared/schemas/inschrijven/paaskamp";
import type { FormErrorEvent, FormSubmitEvent, SelectItem } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { startOfDay, startOfToday } from "date-fns";

const showForm = computed(() => startOfToday() <= startOfDay(new Date("2026-04-12")));

const schoolYearsList = computed(() =>
  schoolYears.map((value) => ({ label: value, value } as SelectItem))
);

const form = useTemplateRef("form");
const formTitle = useTemplateRef("formTitle");

const state = useLocalStorage(
  "inschrijvingsformulier-paaskamp",
  { ...initialState, contact: { ...initialState.contact } },
  { mergeDefaults: true }
);

const qrCode = computed(() =>
  state.value.firstName && state.value.lastName
    ? `BCD
001
1
SCT
GKCCBEBB
HAMSE TURNVERENIGING
BE69068209399078
EUR${campPrice}

Paaskamp ${state.value.firstName} ${state.value.lastName}
`
    : null
);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/inschrijven/paaskamp", {
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
  state.value = {
    ...initialState,
    contact: {
      ...initialState.contact,
    },
  };
  form.value?.clear();
  resetModalOpen.value = false;

  setTimeout(() => {
    formTitle.value?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
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
      <h1>Paaskamp</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-4">
      <h2>Turnkamp Hamse Turnvereniging</h2>
      <p>
        Tijdens de paasvakantie organiseert de Hamse Turnvereniging een leuk en sportief turnkamp
        voor kinderen van het <span class="font-semibold">1ste t.e.m. het 6de leerjaar</span>.
      </p>
      <p>
        Het kamp gaat door op <span class="font-semibold">13, 14 en 15 april 2026</span>, telkens
        van <span class="font-semibold">10u tot 15u</span> in
        <span class="font-semibold">Sporthal Kristoffelheem</span>.
      </p>
      <p>
        De kinderen worden verwacht in
        <span class="font-semibold">sportieve kledij of turnkledij</span> en brengen zelf een
        <span class="font-semibold">drinkbus</span>
        en een <span class="font-semibold">tussendoortje</span> mee.
      </p>
      <p>
        Op <span class="font-semibold">13 en 14 april</span> dienen de sporters een
        <span class="font-semibold">lunchpakket</span> mee te nemen. Op
        <span class="font-semibold">woensdag 15 april</span> voorzien we
        <span class="font-semibold">frietjes</span> voor alle deelnemers.
      </p>
      <p>
        De deelnameprijs bedraagt <span class="font-semibold">&euro; {{ campPrice }}</span
        >.
      </p>
      <p>Inschrijven kan via het formulier hieronder.</p>
    </div>
    <u-form v-if="showForm" ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3 ref="formTitle">Inschrijvingsformulier</h3>
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
            <u-form-field class="flex-1" label="Leerjaar" name="schoolYear" :required="true">
              <u-select
                v-model="state.schoolYear"
                :items="schoolYearsList"
                class="w-full"
                size="xl"
                placeholder="Leerjaar"
              />
            </u-form-field>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h4>Contactpersoon</h4>
          <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <u-form-field class="flex-1" label="Voornaam" name="contact.firstName" :required="true">
              <u-input
                v-model="state.contact.firstName"
                class="w-full"
                size="xl"
                placeholder="Voornaam"
              />
            </u-form-field>
            <u-form-field class="flex-1" label="Naam" name="contact.lastName" :required="true">
              <u-input
                v-model="state.contact.lastName"
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
              name="contact.phoneNumber"
              :required="true"
            >
              <u-input
                v-model="state.contact.phoneNumber"
                class="w-full"
                size="xl"
                placeholder="Telefoonnummer"
              />
            </u-form-field>
            <u-form-field class="flex-1" label="E-mailadres" name="contact.email" :required="true">
              <u-input
                v-model="state.contact.email"
                class="w-full"
                size="xl"
                placeholder="E-mailadres"
              />
            </u-form-field>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h4>Betaalgegevens</h4>
          <div class="sm:hidden flex flex-col gap-2">
            <div class="flex flex-col">
              <div class="text-sm">Rekeningnummer</div>
              <div class="font-semibold py-1">BE69 0682 0939 9078</div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Bedrag</div>
              <div class="font-semibold py-1">&euro; {{ campPrice }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Mededeling</div>
              <div class="font-semibold py-1">
                Paaskamp
                {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                {{ state.lastName != "" ? state.lastName : "Naam" }}
              </div>
            </div>
            <div v-if="qrCode" class="flex flex-col">
              <div class="text-sm py-1">Scan via bank app</div>
              <qrcode class="py-1" width="150" :value="qrCode" :border="0" />
            </div>
          </div>
          <table class="hidden sm:block">
            <tbody>
              <tr>
                <td class="text-sm" width="160px">Rekeningnummer</td>
                <td class="font-semibold py-1">BE69 0682 0939 9078</td>
              </tr>
              <tr>
                <td class="text-sm">Bedrag</td>
                <td class="font-semibold py-1">&euro; {{ campPrice }}</td>
              </tr>
              <tr>
                <td class="text-sm">Mededeling</td>
                <td class="font-semibold py-1">
                  Paaskamp
                  {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                  {{ state.lastName != "" ? state.lastName : "Naam" }}
                </td>
              </tr>
              <tr v-if="qrCode">
                <td class="text-sm align-top py-1">Scan via bank app</td>
                <qrcode class="py-1" width="150" :value="qrCode" />
              </tr>
            </tbody>
          </table>
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
          <p>
            Je ontvangt een bevestiging van je inschrijving via e-mail.
            <span class="font-semibold">Controleer ook je spam/ongewenste e-mail</span>.
          </p>
          <u-button
            label="Inschrijving verzenden"
            type="submit"
            icon="i-lucide-send"
            size="xl"
            color="secondary"
          />
          <u-modal v-model:open="resetModalOpen">
            <u-button label="Gegevens wissen" icon="i-lucide-trash" variant="ghost" color="error" />
            <template #content>
              <div class="flex flex-col gap-4 p-6">
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
                <div class="flex gap-4 justify-end">
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
    <div v-else class="flex flex-col gap-4">
      <h3>Inschrijfformulier</h3>
      <p>Je kan momenteel niet meer inschrijven voor het paaskamp.</p>
    </div>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
