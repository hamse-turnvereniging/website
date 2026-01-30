import * as v from "valibot";

export const paymentTypes = ["Via overschrijving", "Aan de kassa"];

export const schema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
  email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  timeSlot: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("Tijdslot is verplicht"),
      v.picklist(["11u30 - 15u", "16u30 - 19u"])
    )
  ),
  payment: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Betaling is verplicht"), v.picklist(paymentTypes))
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  paymentCheck: false as boolean,
  timeSlot: "11u30 - 15u",
  payment: paymentTypes[0],
} as Schema;
