import { excursionPrice, type Schema } from "#shared/schemas/inschrijven/uitstap";
import emailTemplate from "~~/server/assets/templates/email/inschrijven/uitstap";

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
      group: "Trampoline",
      contact: {
        firstName: "Daisy",
        lastName: "Delcour",
        phoneNumber: "+32 499 765 192",
        email: "steff@steffbeckers.com",
      },
      transport: "Beide",
      paymentCheck: true,
    },
  ];

  const input = inputs[inputIndex];

  if (!input) {
    return;
  }

  const subject = `Bevestiging inschrijving - Uitstap Trampolinepark - ${input.firstName} ${input.lastName}`;

  return emailTemplate({
    ...input,
    subject,
    amount: excursionPrice,
  });
});
