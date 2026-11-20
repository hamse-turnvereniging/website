import { type Schema, theatreOptions } from "#shared/schemas/inschrijven/turnfeest";
import emailTemplate from "~~/server/assets/templates/email/inschrijven/turnfeest";

export default defineEventHandler(async (event) => {
  let inputIndex = 0;

  const query = getQuery(event);
  if (query["inputIndex"]) {
    inputIndex = +query["inputIndex"];
  }

  const contact = {
    firstName: "Daisy",
    lastName: "Delcour",
    phoneNumber: "+32 499 765 192",
    email: "steff@steffbeckers.com",
  };

  const inputs: Schema[] = [
    {
      firstName: "Steff",
      lastName: "Beckers",
      groups: ["Turnen - vanaf het 4de leerjaar (Kristoffelheem)", "Trampoline (Kristoffelheem)"],
      photos: "Ja",
      theatre: theatreOptions[1],
      contact,
    },
    {
      firstName: "Steff",
      lastName: "Beckers",
      groups: ["Turnen - 1ste kleuterklas ('t Vlietje)"],
      photos: "Nee",
      theatre: theatreOptions[0],
      contact,
    },
  ];

  const input = inputs[inputIndex];

  if (!input) {
    return;
  }

  const subject = `Bevestiging inschrijving - Turnfeest 2027 - ${input.firstName} ${input.lastName}`;

  return emailTemplate({
    ...input,
    subject,
    joinsTheatre: input.theatre !== theatreOptions[0],
  });
});
