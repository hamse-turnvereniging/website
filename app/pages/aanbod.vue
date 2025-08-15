<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <section id="banner" class="shadow-lg">
    <div class="max-w-6xl mx-auto flex flex-col px-6 py-[120px]">
      <h1 class="font-bold text-white text-shadow">Aanbod</h1>
    </div>
  </section>
  <section id="turnen" class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-row items-center gap-8">
      <div class="flex flex-1 flex-col gap-6">
        <h1 class="text-secondary">Turnen</h1>
        <p>
          Toestelturnen is een veelzijdige en uitdagende turnsport waarbij kracht, lenigheid,
          evenwicht en coördinatie centraal staan. Onze gymnasten oefenen op verschillende
          toestellen zoals de brug, balk, trampoline, ringen,... Elk toestel vraagt om specifieke
          vaardigheden die op een speelse en veilige manier worden aangeleerd en ontwikkeld.
        </p>
      </div>
      <!-- TODO: Other images -->
      <div class="flex-1">
        <img class="flex-none shadow-lg" src="https://placehold.co/600x400" />
      </div>
    </div>
    <p class="text-center text-xl">
      Onze turnclub biedt toestelturnen aan voor verschillende leeftijden en niveaus:
    </p>
    <div id="turnen-kleuters" class="flex flex-row items-center gap-8">
      <img class="flex-none shadow-lg" src="https://placehold.co/400x240" />
      <div class="flex flex-col gap-6">
        <h2 class="text-primary">Kleuters</h2>
        <p>
          Op een speelse manier maken kleuters kennis met de basisvaardigheden van turnen. We werken
          aan motoriek, coördinatie en plezier in bewegen, met aangepaste toestellen en oefeningen.
        </p>
      </div>
    </div>
    <div id="turnen-lagere-school" class="flex flex-row items-center gap-8">
      <div class="flex flex-col gap-6">
        <h2 class="text-primary">Lagere school</h2>
        <p>
          Hier leggen we de focus op het verder ontwikkelen van turnvaardigheden. De kinderen leren
          technieken aan op de turntoestellen, steeds met aandacht voor een goede houding, controle
          en veiligheid.
        </p>
      </div>
      <img class="flex-none shadow-lg" src="https://placehold.co/400x240" />
    </div>
    <div id="turnen-1ste-middelbaar" class="flex flex-row items-center gap-8">
      <img class="flex-none shadow-lg" src="https://placehold.co/400x240" />
      <div class="flex flex-col gap-6">
        <h2 class="text-primary">Vanaf het 1ste middelbaar</h2>
        <p>
          Ook voor jongeren blijft toestelturnen uitdagend. We bouwen verder op eerder geleerde
          technieken en zetten in op persoonlijke groei, techniekverbetering en plezier in sporten.
        </p>
      </div>
    </div>
    <p class="text-center text-xl">
      Toestelturnen is een sport voor iedereen: jongens en meisjes, beginners en gevorderden.<br />Onder
      begeleiding van onze lesgevers turnen we in een veilige en stimulerende omgeving.
    </p>
  </section>
  <section id="trampoline" class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-row items-center gap-12">
      <div class="flex flex-col gap-6">
        <h1 class="text-secondary">Trampoline</h1>
        <p>
          Op de trampolines leren gymnasten stapsgewijs controle en techniek, van eenvoudige
          sprongen tot indrukwekkende bewegingen in de lucht.
        </p>
        <p>
          Bij ons kunnen kinderen vanaf het 1ste leerjaar starten met trampolinespringen. We bouwen
          rustig op, met aandacht voor een goede lichaamshouding, sprongcontrole en vooral
          veiligheid. Iedereen werkt op zijn of haar eigen tempo en niveau, onder begeleiding van
          enthousiaste en ervaren trainers.
        </p>
        <p>
          Er is geen eindleeftijd, ook jongeren zijn welkom om hun springtalent verder te
          ontwikkelen of gewoon plezier te beleven aan deze unieke sport.
        </p>
      </div>
      <img class="flex-none shadow-lg" src="https://placehold.co/600x400" />
    </div>
    <p class="text-center text-xl">
      Trampolinespringen is niet alleen leuk, het verbetert ook je kracht, coördinatie en
      zelfvertrouwen.<br />Ideaal voor wie houdt van beweging met een vleugje adrenaline!
    </p>
  </section>
  <section id="bbb" class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-row items-center gap-12">
      <img class="flex-none shadow-lg" src="https://placehold.co/600x400" />
      <div class="flex flex-col gap-6">
        <h1 class="text-secondary">BBB</h1>
        <p>
          BBB staat voor Benen, Billen en Buik - een leuke en effectieve groepsles die focust op het
          versterken en verstevigen van deze drie zones. Tijdens de les werken we aan
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
    <p class="text-center text-xl">
      Elke les is anders, maar steeds met hetzelfde doel:<br />sterker worden, je goed voelen en
      vooral plezier hebben in bewegen!
    </p>
  </section>
  <section id="callanetics" class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-row items-center gap-12">
      <div class="flex flex-col gap-6">
        <h1 class="text-secondary">Callanetics</h1>
        <p>
          Callanetics is een rustige maar intensieve vorm van spierversterking die focust op diepe
          spieren, vooral in de buik, billen, benen en rug. Door kleine, gecontroleerde bewegingen
          werk je aan kracht, lenigheid en een betere lichaamshouding - zonder schokken of impact op
          je gewrichten.
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
      <img class="flex-none shadow-lg" src="https://placehold.co/600x400" />
    </div>
    <p class="text-center text-xl">
      Wil je werken aan je lichaam op een rustige maar doelgerichte manier? Dan is Callanetics iets
      voor jou!
    </p>
  </section>
  <section id="net-voetbal-heren" class="max-w-6xl mx-auto flex flex-col gap-8 px-8 py-16">
    <div class="flex flex-row items-center gap-12">
      <img class="flex-none shadow-lg" src="https://placehold.co/600x400" />
      <div class="flex flex-col gap-6">
        <h1 class="text-secondary">Net-voetbal heren</h1>
        <p>
          Net-voetbal is een dynamische en leuke sport die het beste van voetbal en volleybal
          combineert. Twee teams staan tegenover elkaar met een net ertussen en proberen de bal met
          maximum drie contacten terug over het net te spelen - zonder handen, dus met de voeten,
          benen, hoofd of borst.
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
    <p class="text-center text-xl">
      Of je nu al ervaring hebt met voetbal of gewoon op zoek bent naar een nieuwe uitdaging:
      iedereen is welkom!
    </p>
  </section>
</template>

<style lang="css" scoped>
section#banner {
  background-image: url("https://placehold.co/1600x340");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
