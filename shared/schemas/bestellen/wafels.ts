import * as v from "valibot";

import { locationGroups } from "../../data/inschrijving";

export const groups = Object.entries(locationGroups).flatMap(([location, groups]) =>
  groups.map((group) => `${group} (${location})`)
);

const quantity = v.pipe(
  v.number(),
  v.integer("Aantal moet een geheel getal zijn"),
  v.minValue(0, "Aantal mag niet negatief zijn")
);

export const schema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
  phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
  email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
  member: v.object({
    firstName: v.optional(v.pipe(v.string(), v.trim())),
    lastName: v.optional(v.pipe(v.string(), v.trim())),
    group: v.optional(v.picklist(groups)),
  }),
  wafels: v.pipe(
    v.object({
      vanilla: v.optional(quantity),
      chocolate: v.optional(quantity),
      coffee: v.optional(quantity),
    }),
    v.check(
      (wafels) => (wafels.vanilla ?? 0) + (wafels.chocolate ?? 0) + (wafels.coffee ?? 0) > 0,
      "Bestel minstens 1 pak wafels"
    )
  ),
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
  member: {
    firstName: "",
    lastName: "",
    group: undefined,
  },
  wafels: {
    vanilla: undefined,
    chocolate: undefined,
    coffee: undefined,
  },
  paymentCheck: false as boolean,
} as Schema;

export function calculateAmount(wafels: Partial<Schema["wafels"]>) {
  const quantity = (wafels.vanilla ?? 0) + (wafels.chocolate ?? 0) + (wafels.coffee ?? 0);

  return quantity * (quantity >= 3 ? 4 : 5);
}
