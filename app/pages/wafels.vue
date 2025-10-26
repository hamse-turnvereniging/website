<script lang="ts" setup>
import { schema, initialState, type Schema } from "#shared/schemas/bestelling";
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { startOfDay, startOfToday } from "date-fns";
const showForm = computed(() => startOfToday() <= startOfDay(new Date("2025-11-09")));

const form = useTemplateRef("form");
const formTitle = useTemplateRef("formTitle");

const wafelsInitialState = {
  ...initialState,
  type: "Wafels",
  wafels: {
    vanilla: 0,
    chocolate: 0,
  },
} as Schema;

const state = useLocalStorage("bestelformulier-wafels", wafelsInitialState, {
  mergeDefaults: true,
});

const amount = computed(() => {
  const quantity = (state.value.wafels.vanilla ?? 0) + (state.value.wafels.chocolate ?? 0);

  return quantity * (quantity >= 3 ? 4 : 5);
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/bestellen", {
    method: "POST",
    body: event.data,
  });

  const errorToast: Partial<Toast> = {
    title: "Mislukt!",
    description:
      "Er ging iets mis tijdens het verzenden van je bestelling. Probeer het later even opnieuw.",
    color: "error",
  };

  if (!response.success) {
    console.error(response);
    toast.add(errorToast);

    return;
  }

  toast.add({ title: "Gelukt!", description: "Je bestelling is verzonden.", color: "primary" });

  resetForm();
}

const resetModalOpen = ref(false);

function resetForm() {
  state.value = {
    ...wafelsInitialState,
    wafels: {
      ...wafelsInitialState.wafels,
    },
  };
  form.value?.clear();
  resetModalOpen.value = false;
  formTitle.value?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <h1>Wafels</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-4">
      <h2>Wafelverkoop</h2>
      <p>Dit jaar organiseren we voor het eerst een wafelverkoop ten voordele van onze club.</p>
      <p>
        Met deze actie willen we de werking van de Hamse Turnvereniging extra ondersteunen en daar
        kunnen we jullie hulp goed bij gebruiken!
      </p>
      <p>
        We verkopen heerlijke Mina-wafels, verpakt in pakken van 5 wafels per pak.<br />
        Je hebt de keuze tussen vanillewafels of half-gechocolateerde wafels.
      </p>
      <div class="flex flex-wrap gap-4">
        <nuxt-img src="/images/wafels/vanille.jpg" width="180" height="135" />
        <nuxt-img src="/images/wafels/chocolade.jpg" width="180" height="135" />
      </div>
      <p>De prijs bedraagt &euro; 5 per pak, vanaf 3 pakken &euro; 4 per pak.</p>
      <p>Bestellen kan <strong>tot en met 9 november</strong> via het bestelformulier hieronder.</p>
      <p>
        De bestelde wafels zullen verdeeld worden tijdens de lessen vanaf de laatste week van
        november.
      </p>
      <p>Alvast bedankt voor jullie steun! Samen maken we er een geslaagde actie van.</p>
    </div>
    <u-form v-if="showForm" ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3 ref="formTitle">Bestelformulier</h3>
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
              <u-form-field
                class="flex-1"
                label="Telefoonnummer"
                name="phoneNumber"
                :required="true"
              >
                <u-input
                  v-model="state.phoneNumber"
                  class="w-full"
                  size="xl"
                  placeholder="Telefoonnummer"
                />
              </u-form-field>
              <u-form-field class="flex-1" label="E-mailadres" name="email" :required="true">
                <u-input v-model="state.email" class="w-full" size="xl" placeholder="E-mailadres" />
              </u-form-field>
            </div>
            <h4>Wafels</h4>
            <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <u-form-field
                class="flex-1"
                label="Aantal pakken vanillewafels"
                name="wafels.vanilla"
              >
                <u-input
                  v-model="state.wafels.vanilla"
                  type="number"
                  min="0"
                  step="1"
                  class="w-full"
                  size="xl"
                  placeholder="Aantal pakken vanille"
                />
              </u-form-field>
              <u-form-field
                class="flex-1"
                label="Aantal pakken half-gechocolateerde"
                name="wafels.chocolate"
              >
                <u-input
                  v-model="state.wafels.chocolate"
                  type="number"
                  min="0"
                  step="1"
                  class="w-full"
                  size="xl"
                  placeholder="Aantal pakken half-gechocolateerde"
                />
              </u-form-field>
            </div>
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h3>Betaalgegevens</h3>
          <div class="sm:hidden flex flex-col gap-4">
            <div class="flex flex-col">
              <div class="text-sm">Rekeningnummer</div>
              <div class="font-semibold py-1">BE69 0682 0939 9078</div>
            </div>
            <div v-if="amount" class="flex flex-col">
              <div class="text-sm">Bedrag</div>
              <div class="font-semibold py-1">&euro; {{ amount }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Mededeling</div>
              <div class="font-semibold py-1">
                Wafels
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
                <td class="font-semibold py-1">&euro; {{ amount }}</td>
              </tr>
              <tr>
                <td class="text-sm">Mededeling</td>
                <td class="font-semibold py-1">
                  Wafels
                  {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                  {{ state.lastName != "" ? state.lastName : "Naam" }}
                </td>
              </tr>
            </tbody>
          </table>
          <u-form-field name="paymentCheck">
            <u-checkbox
              v-model="state.paymentCheck"
              label="Ik heb reeds betaald of de betaalgegevens zorgvuldig genoteerd."
              description="(te betalen binnen 14 dagen na bestelling)"
              size="xl"
            />
          </u-form-field>
        </div>
        <div class="flex flex-col gap-4">
          <p>
            Je ontvangt een bevestiging van je bestelling via e-mail.
            <span class="font-semibold">Controleer ook je spam/ongewenste e-mail</span>.
          </p>
          <u-button
            label="Bestelling verzenden"
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
                <p>Ben je zeker dat je de gegevens van het bestelformulier wilt wissen?</p>
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
      <h3>Bestelformulier</h3>
      <p>Je kan momenteel geen wafels meer bestellen.</p>
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
