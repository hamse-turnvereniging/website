import * as v from "valibot";

export const timeSlots = ["van 11u30 tot 15u", "van 16u30 tot 19u"];

export const paymentTypes = ["Via overschrijving", "Aan de kassa"];

export const childMeals = [
  {
    name: "Kipnuggets",
    price: 8,
  },
  {
    name: "Hamburgers",
    price: 8,
  },
  {
    name: "Kippenfilet",
    price: 9,
  },
  {
    name: "Vol-au-vent",
    price: 9,
  },
  {
    name: "Goulash",
    price: 9,
  },
];

export const adultMeals = [
  {
    name: "Kippenfilet",
    price: 18,
  },
  {
    name: "Vol-au-vent",
    price: 18,
  },
  {
    name: "Goulash",
    price: 18,
  },
  {
    name: "Koude schotel vlees",
    price: 19,
  },
  {
    name: "Koude schotel vis",
    price: 22,
  },
];

export const supportCardPrice = 5;

export const schema = v.object({
  timeSlot: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Tijdslot is verplicht"), v.picklist(timeSlots))
  ),
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
  email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  childMeals: v.pipe(
    v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.optional(v.number()),
      })
    )
  ),
  adultMeals: v.pipe(
    v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.optional(v.number()),
      })
    )
  ),
  supportCardQuantity: v.optional(v.number()),
  payment: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Betaling is verplicht"), v.picklist(paymentTypes))
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  timeSlot: timeSlots[0],
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  childMeals: [...childMeals],
  adultMeals: [...adultMeals],
  supportCardQuantity: undefined,
  payment: paymentTypes[0],
} as Schema;
