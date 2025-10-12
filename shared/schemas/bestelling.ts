import * as v from "valibot";

export const schema = v.object({
  type: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Type is verplicht"), v.picklist(["Wafels"]))
  ),
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
  email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  paymentCheck: v.pipe(
    v.boolean(),
    v.literal(true, "Je moet binnen 14 dagen na je bestelling betaald hebben")
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  paymentCheck: false as boolean,
} as Schema;
