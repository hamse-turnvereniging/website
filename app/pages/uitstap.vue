<script lang="ts" setup>
import {
  excursionPrice,
  groups,
  initialState,
  schema,
  transportOptions,
  type Schema,
} from "#shared/schemas/inschrijven/uitstap";
import type { FormErrorEvent, FormSubmitEvent, SelectItem } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { startOfDay, startOfToday } from "date-fns";

const showForm = computed(() => startOfToday() <= startOfDay(new Date("2026-06-14")));

const groupsList = computed(() => groups.map((value) => ({ label: value, value }) as SelectItem));

const transportList = computed(() =>
  transportOptions.map((value) => ({ label: value, value }) as SelectItem)
);

const form = useTemplateRef("form");
const formTitle = useTemplateRef("formTitle");

const state = useLocalStorage(
  "inschrijvingsformulier-uitstap",
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
EUR${excursionPrice}

Uitstap ${state.value.firstName} ${state.value.lastName}
`
    : null
);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/inschrijven/uitstap", {
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
      <h1>Uitstap</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-4">
      <h2>Trampolinepark</h2>
      <p>
        Op <span class="font-semibold">zaterdag 27 juni 2026</span> trekken we met alle leden vanaf
        het eerste leerjaar naar <span class="font-semibold">Trampolinepark Geel</span> voor een
        sportieve en leuke voormiddag.
      </p>
      <p>
        We vertrekken om <span class="font-semibold">9u45</span> aan
        <span class="font-semibold">Sporthal Kristoffelheem</span> en zijn rond
        <span class="font-semibold">12u30</span> terug.
      </p>
      <p>
        De deelnameprijs bedraagt <span class="font-semibold">&euro; {{ excursionPrice }}</span>
        voor inkom en een drankje.
      </p>
      <p>
        Breng <span class="font-semibold">anti-slipsokken</span> mee als je die hebt. We rijden met
        de auto en bekijken op basis van de inschrijvingen of extra hulp van ouders nodig is.
      </p>
      <p>
        Inschrijven en betalen kan tot en met <span class="font-semibold">14 juni 2026</span> via
        het formulier hieronder.
      </p>
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
            <u-form-field class="flex-1" label="Groep" name="group" :required="true">
              <u-select
                v-model="state.group"
                :items="groupsList"
                class="w-full"
                size="xl"
                placeholder="Groep"
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
          <h4>Vervoer</h4>
          <p>
            Heb je nog een plaatsje vrij in de wagen en wil je, indien nodig, meehelpen met het
            vervoer?
          </p>
          <u-form-field label="Ik kan helpen met vervoer" name="transport" :required="true">
            <u-select
              v-model="state.transport"
              :items="transportList"
              class="w-full"
              size="xl"
              placeholder="Maak je keuze"
            />
          </u-form-field>
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
              <div class="font-semibold py-1">&euro; {{ excursionPrice }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Mededeling</div>
              <div class="font-semibold py-1">
                Uitstap
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
                <td class="font-semibold py-1">&euro; {{ excursionPrice }}</td>
              </tr>
              <tr>
                <td class="text-sm">Mededeling</td>
                <td class="font-semibold py-1">
                  Uitstap
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
              description="(te betalen ten laatste op 14 juni 2026)"
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
      <p>Je kan momenteel niet meer inschrijven voor de uitstap.</p>
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
