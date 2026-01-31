import { Schema, supportCardPrice } from "#shared/schemas/reserveren/eetdag";
import emailTemplate from "~~/server/assets/templates/email/reserveren/eetdag";

export default defineEventHandler(async (event) => {
  let inputIndex = 0;

  const query = getQuery(event);
  if (query["inputIndex"]) {
    inputIndex = +query["inputIndex"];
  }

  const inputs: Schema[] = [
    {
      timeSlot: "van 11u30 tot 15u",
      firstName: "Steff",
      lastName: "Beckers",
      phoneNumber: "+32 499 765 192",
      email: "steff@steffbeckers.com",
      childMeals: [
        {
          name: "Hamburgers",
          price: 8,
          quantity: 1,
        },
      ],
      adultMeals: [
        {
          name: "Kippenfilet",
          price: 18,
          quantity: 1,
        },
        {
          name: "Vol-au-vent",
          price: 18,
          quantity: 2,
        },
        {
          name: "Goulash",
          price: 18,
          quantity: 1,
        },
      ],
      supportCardQuantity: 1,
      payment: "Via overschrijving",
    },
  ];

  const input = inputs[inputIndex];
  const subject = `Bevestiging reservatie - Eetdag 01/03/2026 - ${input.firstName} ${input.lastName}`;
  const amount = [
    ...input.childMeals.map((x) => (x.quantity ?? 0) * x.price),
    ...input.adultMeals.map((x) => (x.quantity ?? 0) * x.price),
    (input.supportCardQuantity ?? 0) * supportCardPrice,
  ].reduce((sum, amount) => sum + amount, 0);

  return emailTemplate({
    ...input,
    subject,
    amount,
  });
});
