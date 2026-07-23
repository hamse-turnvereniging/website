import * as v from "valibot";

export const groups = [
  "Turnen - 1ste, 2de en 3de leerjaar",
  "Turnen - 4ste, 5de en 6de leerjaar",
  "Turnen - 12+",
  "Trampoline",
] as const;

export const transportOptions = ["Nee", "Brengen", "Halen", "Brengen & halen"] as const;

export const schema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  group: v.optional(
    v.pipe(v.string(), v.trim(), v.nonEmpty("Groep is verplicht"), v.picklist(groups))
  ),
  contact: v.object({
    firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
    lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
    phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
    email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  }),
  transport: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Geef aan of je kan helpen met vervoer"),
    v.picklist(transportOptions)
  ),
  paymentCheck: v.pipe(
    v.boolean(),
    v.literal(true, "Je moet ten laatste 14 juni betaald hebben")
  ),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  firstName: "",
  lastName: "",
  group: undefined,
  contact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  transport: undefined,
  paymentCheck: false as boolean,
} as Schema;

export const excursionPrice = 12;
