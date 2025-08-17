import * as v from "valibot";

export const schema = v.object({
  group: v.optional(v.pipe(v.string(), v.trim(), v.nonEmpty("Groep is verplicht"))),
  location: v.optional(v.pipe(v.string(), v.trim(), v.nonEmpty("Sporthal is verplicht"))),
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  gender: v.optional(v.pipe(v.string(), v.trim(), v.nonEmpty("Gender is verplicht"))),
  dateOfBirth: v.pipe(v.string(), v.trim(), v.nonEmpty("Geboortedatum is verplicht")),
  nationality: v.pipe(v.string(), v.trim(), v.nonEmpty("Nationaliteit is verplicht")),
  address: v.object({
    streetName: v.pipe(v.string(), v.trim(), v.nonEmpty("Straatnaam is verplicht")),
    houseNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Huisnummer is verplicht")),
    postalCode: v.pipe(v.string(), v.trim(), v.nonEmpty("Postcode is verplicht")),
    city: v.pipe(v.string(), v.trim(), v.nonEmpty("Stad/gemeente is verplicht")),
  }),
  phoneNumber: v.string(),
  email: v.optional(
    v.union([v.pipe(v.string(), v.email("E-mailadres is ongeldig")), v.literal("")])
  ),
  emergencyContact: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
  }),
  parent1: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.optional(
      v.union([v.pipe(v.string(), v.email("E-mailadres is ongeldig")), v.literal("")])
    ),
  }),
  parent2: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.optional(
      v.union([v.pipe(v.string(), v.email("E-mailadres is ongeldig")), v.literal("")])
    ),
  }),
  paymentCheck: v.pipe(
    v.boolean(),
    v.literal(true, "Je moet binnen 14 dagen na je inschrijving je lidgeld betaald hebben")
  ),
  photosCheck: v.boolean(),
  rulesCheck: v.pipe(v.boolean(), v.literal(true, "Je moet akkoord gaan")),
  privacyCheck: v.pipe(v.boolean(), v.literal(true, "Je moet akkoord gaan")),
});

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  group: undefined,
  location: undefined,
  firstName: "",
  lastName: "",
  gender: undefined,
  dateOfBirth: "",
  nationality: "",
  address: {
    streetName: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  },
  phoneNumber: "",
  email: "",
  emergencyContact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  parent1: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  parent2: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
  paymentCheck: false as boolean,
  photosCheck: true,
  rulesCheck: false as boolean,
  privacyCheck: false as boolean,
} as Schema;
