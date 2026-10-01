import { calculateAmount, type Schema } from "#shared/schemas/bestellen/wafels";
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
      member: {
        firstName: "Steff",
        lastName: "Beckers",
        group: "Trampoline (Kristoffelheem)",
      },
      paymentCheck: true,
      wafels: {
        chocolate: 3,
        vanilla: 3,
        coffee: 2,
      },
    },
  ];

  const input = inputs[inputIndex];

  if (!input) {
    return;
  }

  const subject = `Bevestiging bestelling - Wafels - ${input.firstName} ${input.lastName}`;

  const amount = calculateAmount(input.wafels);

  return emailTemplate({
    ...input,
    subject,
    amount,
    hasMember: !!(input.member.firstName || input.member.lastName || input.member.group),
  });
});
