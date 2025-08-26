<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner">
    <div class="max-w-6xl mx-auto flex flex-col px-8 py-[120px]">
      <h1>Aanbod</h1>
    </div>
  </section>
  <div class="flex flex-col gap-16 py-16">
    <section id="turnen" class="max-w-6xl mx-auto flex flex-col gap-8 px-8">
      <div class="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8">
        <div class="flex flex-1 flex-col gap-4">
          <h2>Turnen</h2>
          <p>
            Toestelturnen is een veelzijdige en uitdagende turnsport waarbij kracht, lenigheid,
            evenwicht en coördinatie centraal staan. Onze gymnasten oefenen op verschillende
            toestellen zoals de brug, balk, trampoline, ringen,...
          </p>
          <p>
            Elk toestel vraagt om specifieke vaardigheden die op een speelse en veilige manier
            worden aangeleerd en ontwikkeld.
          </p>
        </div>
        <div class="flex-1">
          <nuxt-img
            class="w-full"
            fit="cover"
            src="/images/aanbod/turnen/turnen.jpg"
            width="600"
            height="400"
          />
        </div>
      </div>
      <p class="text-center text-xl">
        Onze turnclub biedt toestelturnen aan voor verschillende leeftijden en niveaus:
      </p>
      <div id="turnen-kleuters" class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div class="flex-1">
          <nuxt-img
            class="flex-none md:ml-auto"
            fit="cover"
            src="/images/aanbod/turnen/kleuters.jpg"
            width="400"
            height="240"
          />
        </div>
        <div class="flex flex-1 flex-col gap-4">
          <h3>Kleuters</h3>
          <p>
            Op een speelse manier maken kleuters kennis met de basisvaardigheden van turnen. We
            werken aan motoriek, coördinatie en plezier in bewegen, met aangepaste toestellen en
            oefeningen.
          </p>
          <div class="py-2">
            <u-modal
              :fullscreen="breakpoints.smallerOrEqual('sm').value"
              :ui="{ content: 'md:max-w-max' }"
            >
              <u-button label="Meer informatie" icon="i-lucide-info" color="secondary" size="xl" />
              <template #content="{ close }">
                <div class="flex flex-col gap-4 p-6">
                  <div class="flex justify-between">
                    <h3>Aanbod turnen kleuters</h3>
                    <u-button
                      icon="i-lucide-x"
                      variant="ghost"
                      color="neutral"
                      size="xl"
                      @click="close"
                    />
                  </div>
                  <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col">
                      <div class="text-sm">Lidgeld</div>
                      <div class="font-semibold py-1">&euro; 85 per jaar</div>
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col items-center">
                      <h4>Kristoffelheem</h4>
                      <table class="w-full">
                        <thead>
                          <tr>
                            <th>Groep</th>
                            <th>Wanneer?</th>
                            <th>Eerste les</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1ste<br />kleuterklas</td>
                            <td>woensdag<br />14u30 - 15u30u</td>
                            <td>3 september</td>
                          </tr>
                          <tr>
                            <td>2de en 3de<br />kleuterklas</td>
                            <td>woensdag<br />13u30 - 14u30u</td>
                            <td>3 september</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="flex flex-col items-center">
                      <h4>'t Vlietje</h4>
                      <table class="w-full">
                        <thead>
                          <tr>
                            <th>Groep</th>
                            <th>Wanneer?</th>
                            <th>Eerste les</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1ste<br />kleuterklas</td>
                            <td>zaterdag<br />9u - 10u</td>
                            <td>6 september</td>
                          </tr>
                          <tr>
                            <td>2de en 3de<br />kleuterklas</td>
                            <td>zaterdag<br />10u - 11u</td>
                            <td>6 september</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
            </u-modal>
          </div>
        </div>
      </div>
      <div
        id="turnen-lagere-school"
        class="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8"
      >
        <div class="flex flex-1 flex-col gap-4">
          <h3>Lagere school</h3>
          <p>
            Hier leggen we de focus op het verder ontwikkelen van turnvaardigheden. De kinderen
            leren technieken aan op de turntoestellen, steeds met aandacht voor een goede houding,
            controle en veiligheid.
          </p>
        </div>
        <div class="flex-1">
          <nuxt-img
            class="flex-none"
            fit="cover"
            src="/images/aanbod/turnen/lagere-school.jpg"
            width="400"
            height="240"
          />
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-center gap-4">
        <div class="flex flex-col items-center">
          <h4>Kristoffelheem</h4>
          <table>
            <thead>
              <tr>
                <th>Groep</th>
                <th>Wanneer?</th>
                <th>Eerste les</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1ste, 2de en 3de<br />leerjaar</td>
                <td>woensdag<br />15u30 - 16u30u</td>
                <td>3 september</td>
              </tr>
              <tr>
                <td>4de, 5de en 6de<br />leerjaar</td>
                <td>donderdag<br />18u - 19u30</td>
                <td>4 september</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col items-center">
          <h4>'t Vlietje</h4>
          <table>
            <thead>
              <tr>
                <th>Groep</th>
                <th>Wanneer?</th>
                <th>Eerste les</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1ste, 2de en 3de<br />leerjaar</td>
                <td>zaterdag<br />10u45 - 12u</td>
                <td>6 september</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="turnen-1ste-middelbaar"
        class="flex flex-col md:flex-row items-center gap-4 md:gap-8"
      >
        <div class="flex-1">
          <nuxt-img
            class="flex-none md:ml-auto"
            fit="cover"
            src="/images/aanbod/turnen/vanaf-1ste-middelbaar.jpg"
            width="400"
            height="240"
          />
        </div>
        <div class="flex flex-1 flex-col gap-4">
          <h3>Vanaf het 1ste middelbaar</h3>
          <p>
            Ook voor jongeren blijft toestelturnen uitdagend. We bouwen verder op eerder geleerde
            technieken en zetten in op persoonlijke groei, techniekverbetering en plezier in
            sporten.
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Waar?</th>
              <th>Wanneer?</th>
              <th>Eerste les</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kristoffelheem</td>
              <td>woensdag<br />18u30 - 20u</td>
              <td>3 september</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center text-xl">
        Toestelturnen is een sport voor iedereen: jongens en meisjes, beginners en gevorderden.
        Onder begeleiding van onze lesgevers turnen we in een veilige en stimulerende omgeving.
      </p>
    </section>
    <section id="trampoline" class="max-w-6xl mx-auto flex flex-col gap-8 px-8">
      <div class="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8">
        <div class="flex flex-1 flex-col gap-4">
          <h2>Trampoline</h2>
          <p>
            Op de trampolines leren gymnasten stapsgewijs controle en techniek, van eenvoudige
            sprongen tot indrukwekkende bewegingen in de lucht.
          </p>
          <p>
            Bij ons kunnen kinderen vanaf het 1ste leerjaar starten met trampolinespringen. We
            bouwen rustig op, met aandacht voor een goede lichaamshouding, sprongcontrole en vooral
            veiligheid. Iedereen werkt op zijn of haar eigen tempo en niveau, onder begeleiding van
            enthousiaste en ervaren trainers.
          </p>
          <p>
            Er is geen eindleeftijd, ook jongeren zijn welkom om hun springtalent verder te
            ontwikkelen of gewoon plezier te beleven aan deze unieke sport.
          </p>
        </div>
        <div class="flex-1">
          <nuxt-img
            class="w-full"
            fit="cover"
            src="/images/aanbod/trampoline.jpg"
            width="600"
            height="400"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Waar?</th>
              <th>Wanneer?</th>
              <th>Eerste les</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kristoffelheem</td>
              <td>zaterdag<br />10u30 - 12u</td>
              <td>6 september</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center text-xl">
        Trampolinespringen is niet alleen leuk, het verbetert ook je kracht, coördinatie en
        zelfvertrouwen.<br />Ideaal voor wie houdt van beweging met een vleugje adrenaline!
      </p>
    </section>
    <section id="bbb" class="max-w-6xl mx-auto flex flex-col gap-8 px-8">
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div class="flex-1">
          <nuxt-img
            class="w-full"
            fit="cover"
            src="/images/aanbod/bbb.png"
            width="600"
            height="400"
          />
        </div>
        <div class="flex flex-1 flex-col gap-4">
          <h2>BBB</h2>
          <p>
            BBB staat voor Buik, Billen en Benen - een leuke en effectieve groepsles die focust op
            het versterken en verstevigen van deze drie zones. Tijdens de les werken we aan
            spierversterking, vetverbranding en een betere lichaamshouding, op motiverende muziek en
            in een energieke groepssfeer.
          </p>
          <p>
            De lessen zijn laagdrempelig en geschikt voor alle leeftijden en niveaus. Of je nu net
            begint met sporten of je conditie en kracht verder wil opbouwen: bij BBB kan je op je
            eigen tempo meedoen.
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Waar?</th>
              <th>Wanneer?</th>
              <th>Eerste les</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kristoffelheem</td>
              <td>woensdag<br />19u - 20u</td>
              <td>10 september</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center text-xl">
        Elke les is anders, maar steeds met hetzelfde doel:<br />sterker worden, je goed voelen en
        vooral plezier hebben in bewegen!
      </p>
    </section>
    <section id="callanetics" class="max-w-6xl mx-auto flex flex-col gap-8 px-8">
      <div class="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8">
        <div class="flex flex-1 flex-col gap-4">
          <h2>Callanetics</h2>
          <p>
            Callanetics is een rustige maar intensieve vorm van spierversterking die focust op diepe
            spieren, vooral in de buik, billen, benen en rug. Door kleine, gecontroleerde bewegingen
            werk je aan kracht, lenigheid en een betere lichaamshouding - zonder schokken of impact
            op je gewrichten.
          </p>
          <p>
            Deze trainingsmethode is ideaal voor wie op een veilige en doeltreffende manier aan zijn
            lichaam wil werken. De oefeningen lijken misschien eenvoudig, maar ze zijn bijzonder
            effectief - al na een paar lessen merk je verschil in spierspanning en soepelheid.
          </p>
          <p>
            Callanetics is geschikt voor alle leeftijden, ook voor mensen met rug- of
            gewrichtsklachten, dankzij de zachte en doordachte aanpak. Ademhaling, controle en
            precisie staan centraal, steeds in een ontspannen sfeer.
          </p>
        </div>
        <div class="flex-1">
          <nuxt-img
            class="w-full"
            fit="cover"
            src="/images/aanbod/callanetics.png"
            width="600"
            height="400"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Waar?</th>
              <th>Wanneer?</th>
              <th>Eerste les</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kristoffelheem</td>
              <td>dinsdag<br />19u - 20u</td>
              <td>9 september</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center text-xl">
        Wil je werken aan je lichaam op een rustige maar doelgerichte manier? Dan is Callanetics
        iets voor jou!
      </p>
    </section>
    <section id="net-voetbal-heren" class="max-w-6xl mx-auto flex flex-col gap-8 px-8">
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div class="flex-1">
          <nuxt-img
            class="w-full"
            fit="cover"
            src="/images/aanbod/net-voetbal-heren.png"
            width="600"
            height="400"
          />
        </div>
        <div class="flex flex-1 flex-col gap-4">
          <h2>Net-voetbal heren</h2>
          <p>
            Net-voetbal is een dynamische en leuke sport die het beste van voetbal en volleybal
            combineert. Twee teams staan tegenover elkaar met een net ertussen en proberen de bal
            met maximum drie contacten terug over het net te spelen - zonder handen, dus met de
            voeten, benen, hoofd of borst.
          </p>
          <p>
            Deze sport vraagt snelheid, techniek, precisie en een goede teamgeest. Het is een
            uitstekende manier om je balcontrole en reactievermogen te verbeteren, terwijl je ook
            stevig aan je conditie werkt.
          </p>
          <p>
            Onze net-voetbalgroep voor heren is bedoeld voor wie graag sportief bezig is in een
            ontspannen sfeer.
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Waar?</th>
              <th>Wanneer?</th>
              <th>Eerste les</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kristoffelheem</td>
              <td>woensdag<br />19u - 20u</td>
              <td>3 september</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center text-xl">
        Of je nu al ervaring hebt met voetbal of gewoon op zoek bent naar een nieuwe uitdaging:
        iedereen is welkom!
      </p>
    </section>
  </div>
</template>

<style scoped>
@reference "./../assets/css/main.css";

section#banner {
  @apply bg-primary-300;
  background-image: url("/images/banner.jpg");
}

table {
  thead {
    @apply border-b-secondary border-b-2;

    tr {
      th {
        @apply text-secondary p-3;
      }
    }
  }

  tbody {
    @apply border-b-secondary border-b-2;

    tr {
      @apply odd:bg-primary-200 odd:border-b-primary odd:border-b-1 even:bg-neutral-50 even:border-b-neutral-100 even:border-b-1;

      td {
        @apply text-center p-2 sm:p-4;
      }
    }
  }
}

p.text-center.text-xl {
  @apply text-secondary-500;
}
</style>
