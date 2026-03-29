import { Schema } from "#shared/schemas/bestellen/wafels";
import emailTemplate from "~~/server/assets/templates/email/bestellen/wafels";

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
      phoneNumber: "+32 499 765 192",
      email: "steff@steffbeckers.com",
      paymentCheck: true,
      wafels: {
        chocolate: 3,
        vanilla: 3,
      },
    },
  ];

  const input = inputs[inputIndex];

  if (!input) {
    return;
  }

  const subject = `Bevestiging bestelling - Wafels - ${input.firstName} ${input.lastName}`;

  const quantity = (input.wafels.vanilla ?? 0) + (input.wafels.chocolate ?? 0);
  const amount = quantity * (quantity >= 3 ? 4 : 5);

  return emailTemplate({
    ...input,
    subject,
    amount,
  });
});
