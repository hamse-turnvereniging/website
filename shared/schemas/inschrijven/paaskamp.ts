import * as v from "valibot";

export const schoolYears = [
  "1ste leerjaar",
  "2de leerjaar",
  "3de leerjaar",
  "4de leerjaar",
  "5de leerjaar",
  "6de leerjaar",
] as const;

export const schema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  schoolYear: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Leerjaar is verplicht"), v.picklist(schoolYears))
  ),
  contact: v.object({
    firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
    lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
    phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
    email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  }),
  paymentCheck: v.pipe(
    v.boolean(),
    v.literal(true, "Je moet binnen 14 dagen na je inschrijving betaald hebben")
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  firstName: "",
  lastName: "",
  schoolYear: undefined,
  contact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  paymentCheck: false as boolean,
} as Schema;

export const campPrice = 45;
