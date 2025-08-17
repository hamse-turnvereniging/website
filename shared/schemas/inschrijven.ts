import * as v from "valibot";

export default v.object({
  group: v.pipe(v.string(), v.trim(), v.nonEmpty("Groep is verplicht.")),
  location: v.pipe(v.string(), v.trim(), v.nonEmpty("Sporthal is verplicht.")),
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht.")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht.")),
  gender: v.pipe(v.string(), v.trim(), v.nonEmpty("Gender is verplicht.")),
  dateOfBirth: v.pipe(v.string(), v.trim(), v.nonEmpty("Geboortedatum is verplicht.")),
  nationality: v.pipe(v.string(), v.trim(), v.nonEmpty("Nationaliteit is verplicht.")),
  address: v.object({
    streetName: v.pipe(v.string(), v.trim(), v.nonEmpty("Straatnaam is verplicht.")),
    houseNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Huisnummer is verplicht.")),
    postalCode: v.pipe(v.string(), v.trim(), v.nonEmpty("Postcode is verplicht.")),
    city: v.pipe(v.string(), v.trim(), v.nonEmpty("Stad/gemeente is verplicht.")),
  }),
  phoneNumber: v.string(),
  email: v.string(),
  emergencyContact: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
  }),
  parent1: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.string(),
  }),
  parent2: v.object({
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.string(),
    email: v.string(),
  }),
  paymentCheck: v.pipe(v.boolean(), v.literal(true, "Verplicht")),
  photosCheck: v.boolean(),
  rulesCheck: v.pipe(v.boolean(), v.literal(true, "Verplicht")),
  privacyCheck: v.pipe(v.boolean(), v.literal(true, "Verplicht")),
});
