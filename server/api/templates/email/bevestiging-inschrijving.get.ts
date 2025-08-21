import { groupPrice } from "#shared/data/inschrijving";
import { Schema } from "#shared/schemas/inschrijving";
import bevestigingInschrijvingEmailTemplate from "~~/server/assets/templates/email/bevestiging-inschrijving";

export default defineEventHandler(async (event) => {
  let inputIndex = 0;

  const query = getQuery(event);
  if (query["inputIndex"]) {
    inputIndex = +query["inputIndex"];
  }

  const inputs: Schema[] = [
    {
      group: "Callanetics",
      location: "Kristoffelheem",
      address: {
        city: "Tessenderlo-Ham",
        houseNumber: "70",
        postalCode: "3945",
        streetName: "Kwamol",
      },
      dateOfBirth: "10/02/1995",
      email: "steff@steffbeckers.com",
      emergencyContact: {
        firstName: "Daisy",
        lastName: "Delcour",
        phoneNumber: "+32 478 17 16 43",
      },
      firstName: "Steff",
      lastName: "Beckers",
      nationality: "Belg",
      paymentCheck: true,
      phoneNumber: "+32 499 765 192",
      photosCheck: true,
      privacyCheck: true,
      rulesCheck: true,
      gender: "Man",
    },
    {
      group: "Turnen - 1ste, 2de en 3de leerjaar",
      location: "'t Vlietje",
      firstName: "Steff",
      lastName: "Beckers",
      dateOfBirth: "10/02/1995",
      nationality: "Belg",
      gender: "Man",
      address: {
        streetName: "Kwamol",
        houseNumber: "70",
        postalCode: "3945",
        city: "Tessenderlo-Ham",
      },
      parent1: {
        firstName: "Daisy",
        lastName: "Delcour",
        phoneNumber: "+32478171643",
        email: "delcour.daisy@hotmail.com",
      },
      parent2: {
        firstName: "Steff",
        lastName: "Beckers",
        phoneNumber: "+32 499 76 51 92",
        email: "beckerssteff@gmail.com",
      },
      paymentCheck: true,
      photosCheck: false,
      rulesCheck: true,
      privacyCheck: true,
    },
  ];

  const input = inputs[inputIndex];
  const subject = `Bevestiging inschrijving - ${input.firstName} ${input.lastName} (${input.group} - Sporthal ${input.location})`;
  const price = input.group && groupPrice[input.group];

  return bevestigingInschrijvingEmailTemplate({ ...input, subject, price });
});
