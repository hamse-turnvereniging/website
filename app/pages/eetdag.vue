<script lang="ts" setup>
import {
  schema,
  initialState,
  type Schema,
  paymentTypes,
} from "~~/shared/schemas/reserveren/eetdag";
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { startOfDay, startOfToday } from "date-fns";
const showForm = computed(() => startOfToday() <= startOfDay(new Date("2026-02-25")));

const form = useTemplateRef("form");
const formTitle = useTemplateRef("formTitle");

const state = useLocalStorage("reservatieformulier-eetdag", initialState, {
  mergeDefaults: true,
});

const amount = computed(() => {
  // TODO: Calculate amount
  return 0;
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch("/api/reserveren/eetdag", {
    method: "POST",
    body: event.data,
  });

  const errorToast: Partial<Toast> = {
    title: "Mislukt!",
    description:
      "Er ging iets mis tijdens het verzenden van je reservatie. Probeer het later even opnieuw.",
    color: "error",
  };

  if (!response.success) {
    console.error(response);
    toast.add(errorToast);

    return;
  }

  toast.add({ title: "Gelukt!", description: "Je reservatie is verzonden.", color: "primary" });

  resetForm();
}

const resetModalOpen = ref(false);

function resetForm() {
  state.value = { ...initialState };
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
      <h1>Eetdag</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-col gap-4">
      <h2>Eetdag</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ratione sint perspiciatis
        nostrum vitae et repudiandae facilis soluta, omnis modi delectus dolores. Dolor odit rem
        molestiae inventore eligendi et veritatis!
      </p>
    </div>
    <u-form v-if="showForm" ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3 ref="formTitle">Reserveren</h3>
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
          </div>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h4>Betaling</h4>
          <URadioGroup v-model="state.payment" :items="paymentTypes" size="xl" />
          <!-- TODO: Add SEPA QR -->
          <div class="sm:hidden flex flex-col gap-4">
            <div v-if="state.payment === paymentTypes[0]" class="flex flex-col">
              <div class="text-sm">Rekeningnummer</div>
              <div class="font-semibold py-1">BE69 0682 0939 9078</div>
            </div>
            <div class="flex flex-col">
              <div class="text-sm">Bedrag</div>
              <div class="font-semibold py-1">&euro; {{ amount }}</div>
            </div>
            <div v-if="state.payment === paymentTypes[0]" class="flex flex-col">
              <div class="text-sm">Mededeling</div>
              <div class="font-semibold py-1">
                Eetdag
                {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                {{ state.lastName != "" ? state.lastName : "Naam" }}
              </div>
            </div>
          </div>
          <table class="hidden sm:block">
            <tbody>
              <tr v-if="state.payment === paymentTypes[0]">
                <td class="text-sm">Rekeningnummer</td>
                <td class="font-semibold py-1">BE69 0682 0939 9078</td>
              </tr>
              <tr>
                <td class="text-sm" width="160px">Bedrag</td>
                <td class="font-semibold py-1">&euro; {{ amount }}</td>
              </tr>
              <tr v-if="state.payment === paymentTypes[0]">
                <td class="text-sm">Mededeling</td>
                <td class="font-semibold py-1">
                  Eetdag
                  {{ state.firstName != "" ? state.firstName : "Voornaam" }}
                  {{ state.lastName != "" ? state.lastName : "Naam" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <p>
            Je ontvangt een bevestiging van je reservatie via e-mail.
            <span class="font-semibold">Controleer ook je spam/ongewenste e-mail</span>.
          </p>
          <u-button
            label="Reservatie verzenden"
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
                <p>Ben je zeker dat je de gegevens van het reservatieformulier wilt wissen?</p>
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
      <h3>Reserveren</h3>
      <p>Je kan momenteel niet meer reserveren voor de eetdag.</p>
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
