import { Schema, campPrice } from "#shared/schemas/inschrijven/paaskamp";
import emailTemplate from "~~/server/assets/templates/email/inschrijven/paaskamp";

export default defineEventHandler(async (event) => {
  let inputIndex = 0;

  const query = getQuery(event);
  if (query["inputIndex"]) {
    inputIndex = +query["inputIndex"];
  }

  const inputs: Schema[] = [
    {
      firstName: "Steff",
      lastName: "Beckers",
      schoolYear: "6de leerjaar",
      contact: {
        firstName: "Daisy",
        lastName: "Delcour",
        phoneNumber: "+32 499 765 192",
        email: "steff@steffbeckers.com",
      },
      paymentCheck: true,
    },
  ];

  const input = inputs[inputIndex];

  if (!input) {
    return;
  }

  const subject = `Bevestiging inschrijving - Paaskamp 2026 - ${input.firstName} ${input.lastName}`;

  return emailTemplate({
    ...input,
    subject,
    amount: campPrice,
  });
});
