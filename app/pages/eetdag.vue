<script lang="ts" setup>
import {
  schema,
  initialState,
  type Schema,
  paymentTypes,
  timeSlots,
  supportCardPrice,
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

// Number input state fixes
watch(state.value, (value) => {
  for (let i = 0; i < value.childMeals.length; i++) {
    const childMeal = value.childMeals[i];

    if (!childMeal) {
      continue;
    }

    if ((childMeal.quantity as any) === "") {
      state.value.childMeals[i]!.quantity = undefined;
    }
  }

  for (let i = 0; i < value.adultMeals.length; i++) {
    const adultMeal = value.adultMeals[i];

    if (!adultMeal) {
      continue;
    }

    if ((adultMeal.quantity as any) === "") {
      state.value.adultMeals[i]!.quantity = undefined;
    }
  }

  if ((value.supportCardQuantity as any) === "") {
    state.value.supportCardQuantity = undefined;
  }
});

const quantity = computed(() =>
  [
    ...state.value.childMeals.map((x) => x.quantity ?? 0),
    ...state.value.adultMeals.map((x) => x.quantity ?? 0),
    state.value.supportCardQuantity ?? 0,
  ].reduce((sum, quantity) => sum + Number(quantity), 0)
);

const amount = computed(() =>
  [
    ...state.value.childMeals.map((x) => (x.quantity ?? 0) * x.price),
    ...state.value.adultMeals.map((x) => (x.quantity ?? 0) * x.price),
    (state.value.supportCardQuantity ?? 0) * supportCardPrice,
  ].reduce((sum, amount) => sum + Number(amount), 0)
);

const qrCode = computed(() =>
  amount.value > 0 && state.value.firstName && state.value.lastName
    ? `BCD
001
1
SCT
GKCCBEBB
HAMSE TURNVERENIGING
BE69068209399078
EUR${amount.value}

Eetdag ${state.value.firstName} ${state.value.lastName}
`
    : null
);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const body = { ...event.data };

  body.childMeals = body.childMeals.filter((x) => x.quantity && x.quantity > 0);
  body.adultMeals = body.adultMeals.filter((x) => x.quantity && x.quantity > 0);

  const response = await $fetch("/api/reserveren/eetdag", {
    method: "POST",
    body,
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
        Op <span class="font-semibold">zondag 1 maart 2026</span> organiseren we onze jaarlijkse
        eetdag in de grote zaal van het <span class="font-semibold">Kristoffelheem</span> in
        Oostham.
      </p>
      <p>
        Kom smullen van allerlei lekkers en steun ondertussen onze club. Reserveer via onderstaand
        formulier en geef ook aan op welk moment je graag komt eten.
      </p>
      <p>
        Het eindbedrag wordt automatisch berekend en kan je onderaan de pagina terugvinden. Betaal
        via een overschrijving of aan de kassa op de dag zelf.
      </p>
      <p>Reserveren kan <span class="font-semibold">tot en met 25 februari</span>.</p>
      <p class="font-semibold">
        Opgelet: breng zeker je bevestingsmail (digitaal of afgedrukt) mee op de eetdag zelf als
        bewijs van je bestelling.
      </p>
    </div>
    <u-form v-if="showForm" ref="form" :schema :state @submit="onSubmit" @error="onError">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3 ref="formTitle">Reserveren</h3>
          <div class="flex flex-col gap-4">
            <u-form-field class="flex-1" label="Tijdslot" name="timeSlot">
              <u-radio-group
                v-model="state.timeSlot"
                :items="timeSlots"
                orientation="horizontal"
                size="xl"
              />
            </u-form-field>
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
          <h4>Gerechten of steunkaart</h4>
          <p>
            <span class="font-semibold">Alle gerechten</span> worden geserveerd
            <span class="font-semibold">met lekkere frietjes</span>!
          </p>
          <h5><span class="font-bold">Kindermenu</span>: soep, hoofdgerecht en dessert</h5>
          <table class="meals">
            <tbody>
              <tr v-for="childMeal in state.childMeals" :key="childMeal.name">
                <td>{{ childMeal.name }}</td>
                <td class="w-10 text-right">&euro; {{ childMeal.price }}</td>
                <td class="w-10 text-center"><u-icon class="mt-1.5" name="i-lucide-x" /></td>
                <td class="w-25">
                  <u-input
                    class="w-full"
                    v-model="childMeal.quantity"
                    size="xl"
                    type="number"
                    min="0"
                    step="1"
                    :name="'adult-meal-' + childMeal.name + '-quantity'"
                    placeholder="Aantal"
                  />
                </td>
                <td class="w-10 text-center"><span v-if="childMeal.quantity">&equals;</span></td>
                <td class="w-15">
                  <span v-if="childMeal.quantity">
                    &euro; {{ childMeal.quantity * childMeal.price }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <h5><span class="font-bold">Volwassenen</span>: soep, hoofdgerecht, dessert of koffie</h5>
          <table class="meals">
            <tbody>
              <tr v-for="adultMeal in state.adultMeals" :key="adultMeal.name">
                <td>{{ adultMeal.name }}</td>
                <td class="w-10 text-right">&euro; {{ adultMeal.price }}</td>
                <td class="w-10 text-center"><u-icon class="mt-1.5" name="i-lucide-x" /></td>
                <td class="w-25">
                  <u-input
                    class="w-full"
                    v-model="adultMeal.quantity"
                    size="xl"
                    type="number"
                    min="0"
                    step="1"
                    :name="'adult-meal-' + adultMeal.name + '-quantity'"
                    placeholder="Aantal"
                  />
                </td>
                <td class="w-10 text-center"><span v-if="adultMeal.quantity">&equals;</span></td>
                <td class="w-15">
                  <span v-if="adultMeal.quantity">
                    &euro; {{ adultMeal.quantity * adultMeal.price }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <h5>Steunkaart <u-icon name="i-lucide-heart" /></h5>
          <table>
            <tbody>
              <tr>
                <td>Wil je ons ook graag steunen?</td>
                <td class="w-10 text-right">&euro; {{ supportCardPrice }}</td>
                <td class="w-10 text-center"><u-icon class="mt-1.5" name="i-lucide-x" /></td>
                <td class="w-25">
                  <u-input
                    class="w-full"
                    v-model="state.supportCardQuantity"
                    size="xl"
                    type="number"
                    min="0"
                    step="1"
                    name="support-card-quantity"
                    placeholder="Aantal"
                  />
                </td>
                <td class="w-10 text-center">
                  <span v-if="state.supportCardQuantity">&equals;</span>
                </td>
                <td class="w-15">
                  <span v-if="state.supportCardQuantity">
                    &euro; {{ state.supportCardQuantity * supportCardPrice }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <table v-if="quantity">
            <tbody>
              <tr>
                <td class="text-right">Totaal aantal</td>
                <td class="w-6"></td>
                <td class="w-25 ps-3">{{ quantity }}</td>
                <td class="w-10 text-center">&equals;</td>
                <td class="w-15">&euro; {{ amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div class="flex flex-col gap-4">
          <h4>Betaling</h4>
          <u-radio-group
            v-model="state.payment"
            :items="paymentTypes"
            orientation="horizontal"
            size="xl"
          />
          <div class="sm:hidden flex flex-col gap-2">
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
            <div v-if="state.payment === paymentTypes[0] && qrCode" class="flex flex-col">
              <div class="text-sm py-1">Scan via bank app</div>
              <qrcode class="py-1" width="150" :value="qrCode" :border="0" />
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
              <tr v-if="state.payment === paymentTypes[0] && qrCode">
                <td class="text-sm align-top py-1">Scan via bank app</td>
                <qrcode class="py-1" width="150" :value="qrCode" />
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

table.meals {
  tr {
    @apply border-b-1 border-b-neutral-50 last-of-type:border-0;

    td {
      @apply py-1;
    }
  }
}
</style>
