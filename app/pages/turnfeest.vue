<script lang="ts" setup>
import {
  canJoinTheatre,
  groups,
  groupValue,
  initialState,
  locationGroups,
  photoOptions,
  schema,
  theatreOptions,
  type Schema,
} from "#shared/schemas/inschrijven/turnfeest";
import type { CheckboxGroupItem, FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import { startOfDay, startOfToday } from "date-fns";

const showForm = computed(() => startOfToday() <= startOfDay(new Date("2026-12-20")));

const locations = Object.entries(locationGroups).map(([location, names]) => ({
  location,
  items: names.map(
    (group) => ({ label: group, value: groupValue(location, group) }) as CheckboxGroupItem
  ),
}));

const photoOptionsList = [...photoOptions];
const theatreOptionsList = [...theatreOptions];

const { submitted, isSubmitting, submit, startAgain } = useFormSubmission();

const form = useTemplateRef("form");
const formTitle = useTemplateRef("formTitle");

const state = useLocalStorage("inschrijvingsformulier-turnfeest", structuredClone(initialState), {
  mergeDefaults: true,
});

function selectedGroups(location: string) {
  return state.value.groups.filter((group) => group.endsWith(`(${location})`));
}

// Elke sporthal heeft een eigen lijst met vinkjes, maar ze vullen samen één lijst met groepen.
function selectGroups(location: string, selected: string[]) {
  const others = state.value.groups.filter((group) => !group.endsWith(`(${location})`));

  state.value.groups = groups.filter(
    (group) => others.includes(group) || selected.includes(group)
  );
}

const showTheatre = computed(() => canJoinTheatre(state.value.groups));

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const success = await submit(() =>
    $fetch("/api/inschrijven/turnfeest", {
      method: "POST",
      body: event.data,
    })
  );

  const errorToast: Partial<Toast> = {
    title: "Mislukt!",
    description:
      "Er ging iets mis tijdens het verzenden van je inschrijving. Probeer het later even opnieuw.",
    color: "error",
  };

  if (success === undefined) return;

  if (!success) {
    toast.add(errorToast);

    return;
  }

  resetForm(false);
}

const { resetModalOpen, finishReset, onResetModalClose } = useFormResetFocus(formTitle);

function resetForm(scrollToForm = true) {
  state.value = structuredClone(initialState);
  form.value?.clear();
  finishReset(scrollToForm);
}

function restartForm() {
  startAgain();
  resetForm();
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
      <h1>Turnfeest</h1>
    </div>
  </section>
  <section class="max-w-2xl mx-auto flex flex-col gap-8 px-8 py-16">
    <motion-reveal class="flex flex-col gap-4">
      <h2>Turnfeest 2027 - Aladdin</h2>
      <p>
        Stap binnen in de magische wereld van <span class="font-semibold">Aladdin</span>, waar onze
        turners u meenemen op een betoverende reis doorheen het sprookjesachtige Agrabah. Tijdens
        dit optreden laten de leden zien wat ze dit jaar allemaal hebben geleerd.
      </p>
      <p>
        Om dit optreden vlot te laten verlopen, vragen wij u om uw zoon of dochter in te schrijven.
        Zodra uw kind is ingeschreven, rekenen we op zijn/haar/x aanwezigheid op onderstaande
        momenten:
      </p>
      <div class="flex flex-col gap-1">
        <p class="font-semibold">De generale repetitie: zaterdag 13 maart</p>
        <ul>
          <li>
            Leden worden verwacht om <span class="font-semibold">10u</span> in de sporthal
            <span class="italic">Kristoffelheem</span>
          </li>
          <li>Einde: de generale repetitie loopt tot <span class="font-semibold">12u</span></li>
        </ul>
      </div>
      <div class="flex flex-col gap-1">
        <p class="font-semibold">Het turnfeest: zaterdag 20 maart</p>
        <ul>
          <li>
            Start: het turnoptreden begint om <span class="font-semibold">14u30</span> in de sporthal
            <span class="italic">Kristoffelheem</span>
          </li>
          <li>Leden worden tussen 13u30 en 14u verwacht (uur wordt nog meegedeeld per groep)</li>
        </ul>
      </div>
      <p>
        Schrijf in tegen ten laatste <span class="font-semibold">20 december</span> en help ons om
        samen een magisch avontuur tot leven te brengen! Inschrijven kan via het formulier
        hieronder.
      </p>
      <p class="italic">
        Meer informatie over het verloop van de dag en de kledij die de leden moeten dragen ontvangt
        u binnenkort.
      </p>
    </motion-reveal>
    <form-success
      v-if="submitted"
      title="Je inschrijving is succesvol verzonden!"
      description="We hebben je inschrijving voor het turnfeest goed ontvangen. Tot dan!"
      restart-label="Nog iemand inschrijven"
      :can-restart="showForm"
      @restart="restartForm"
    />
    <motion-reveal v-else-if="showForm" :delay="0.1">
      <u-form ref="form" :schema :state @submit="onSubmit" @error="onError">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <h3 ref="formTitle" tabindex="-1" class="focus:outline-none">Inschrijvingsformulier</h3>
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
              <u-form-field
                label="In welke groep turnt hij/zij/x?"
                description="Indien uw zoon of dochter in meerdere groepen is ingeschreven, kan hij/zij/x deelnemen aan de optredens van al deze groepen. Uw kind zal dus de kans krijgen om meerdere keren op te treden en zijn/haar/x vaardigheden in verschillende onderdelen te tonen."
                name="groups"
                :required="true"
                :ui="{ description: 'italic' }"
              >
                <div class="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-6">
                  <u-checkbox-group
                    v-for="{ location, items } in locations"
                    :key="location"
                    class="flex-1"
                    :legend="`Sporthal ${location}`"
                    :items="items"
                    :model-value="selectedGroups(location)"
                    size="xl"
                    @update:model-value="selectGroups(location, $event as string[])"
                  />
                </div>
              </u-form-field>
              <u-form-field
                label="Mogen er foto's gemaakt worden van uw zoon/dochter?"
                description="Deze worden achteraf gedeeld via de website."
                name="photos"
                :required="true"
                :ui="{ description: 'italic' }"
              >
                <u-radio-group
                  v-model="state.photos"
                  class="pt-2"
                  :items="photoOptionsList"
                  orientation="horizontal"
                  size="xl"
                />
              </u-form-field>
            </div>
          </div>
          <template v-if="showTheatre">
            <hr />
            <div class="flex flex-col gap-4">
              <h4>Zin om EXTRA mee te schitteren in het verhaal van Aladdin?</h4>
              <p>
                We zoeken leden die hun turnkunsten graag extra in de schijnwerpers willen zetten!
              </p>
              <p>
                Wil jij niet alleen je turnkunsten tonen, maar ook eens in de huid kruipen van een
                personage uit het magische verhaal van <span class="font-semibold">Aladdin</span>? Dan
                is dit jouw kans!
              </p>
              <p>
                Tussen de verschillende turngroepen door brengen we het verhaal van Aladdin tot leven.
                Hiervoor zijn we op zoek naar enthousiaste leden vanaf het
                <span class="font-semibold">3de leerjaar</span> die graag een rolletje willen spelen en
                zich willen inzetten om ons turnfeest nog magischer te maken!
              </p>
              <p>
                We zijn op zoek naar enkele hoofdrolspelers die het verhaal uitbeelden. Geen zorgen,
                je hoeft hiervoor niets te zeggen, er zal een verteller aanwezig zijn. Het gaat om een
                combinatie van toneel en turnen, waarbij we de turnoefeningen verwerken in het
                verhaal.
              </p>
              <p>
                Uit de leden die zich inschrijven voor het toneel, kiezen we een aantal
                hoofdrolspelers. De andere deelnemers krijgen een leuke bijrol toegewezen.
              </p>
              <p>
                Sta je liever niet op de voorgrond, maar help je wel graag mee om het verhaal tot
                leven te brengen? Geen probleem! Je kan je ook uitsluitend inschrijven voor een
                bijrol.
              </p>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Praktische informatie:</p>
                <ul>
                  <li>
                    De repetities vinden plaats op zaterdagvoormiddag van
                    <span class="font-semibold">9u30 tot 10u30</span>.
                    <ul>
                      <li>23 januari</li>
                      <li>30 januari</li>
                      <li>6 februari</li>
                      <li>13 februari niet (Krokusvakantie)</li>
                      <li>20 februari</li>
                      <li>27 februari</li>
                      <li>6 maart</li>
                      <li>13 maart generale repetitie</li>
                      <li>20 maart turnfeest</li>
                    </ul>
                  </li>
                  <li>
                    <span class="font-semibold"
                      >We rekenen wel op een maximale aanwezigheid tijdens de hiervoor voorziene
                      lessen</span
                    >, zodat iedereen zijn of haar rol goed kan voorbereiden.
                  </li>
                </ul>
              </div>
              <p>Heb jij zin om mee te schitteren? Schrijf je dan zeker in voor het toneel!</p>
              <u-form-field name="theatre">
                <u-radio-group v-model="state.theatre" :items="theatreOptionsList" size="xl" />
              </u-form-field>
            </div>
          </template>
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
            <p>
              Je ontvangt een bevestiging van je inschrijving via e-mail.
              <span class="font-semibold">Controleer ook je spam/ongewenste e-mail</span>.
            </p>
            <u-button
              label="Inschrijving verzenden"
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              icon="i-lucide-send"
              size="xl"
              color="secondary"
            />
            <u-modal v-model:open="resetModalOpen" :content="{ onCloseAutoFocus: onResetModalClose }">
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
    </motion-reveal>
    <motion-reveal v-else class="flex flex-col gap-4">
      <h3>Inschrijfformulier</h3>
      <p>Je kan momenteel niet meer inschrijven voor het turnfeest.</p>
    </motion-reveal>
  </section>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}
</style>
