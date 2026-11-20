import * as v from "valibot";

export const locationGroups: { [location: string]: string[] } = {
  Kristoffelheem: [
    "Turnen - 1ste kleuterklas",
    "Turnen - 2de en 3de kleuterklas",
    "Turnen - 1ste, 2de en 3de leerjaar",
    "Turnen - vanaf het 4de leerjaar",
    "Trampoline",
  ],
  "'t Vlietje": [
    "Turnen - 1ste kleuterklas",
    "Turnen - 2de en 3de kleuterklas",
    "Turnen - 1ste, 2de en 3de leerjaar",
  ],
};

export function groupValue(location: string, group: string): string {
  return `${group} (${location})`;
}

export const groups: string[] = Object.entries(locationGroups).flatMap(([location, names]) =>
  names.map((group) => groupValue(location, group))
);

export const photoOptions = ["Ja", "Nee"] as const;

export const theatreOptions = [
  "Ik doe niet mee met het toneel",
  "Ik doe mee met het toneel",
  "Ik wil meedoen met het toneel, maar wil enkel een bijrol",
] as const;

// Het toneel is voor leden van de lagere school; kleuters kunnen niet meedoen.
export function canJoinTheatre(selectedGroups: string[]): boolean {
  return selectedGroups.some((group) => !group.includes("kleuterklas"));
}

export const schema = v.pipe(
  v.object({
    firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
    lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
    groups: v.pipe(v.array(v.picklist(groups)), v.minLength(1, "Kies minstens één groep")),
    photos: v.picklist(photoOptions, "Geef aan of er foto's gemaakt mogen worden"),
    theatre: v.picklist(theatreOptions),
    contact: v.object({
      firstName: v.pipe(v.string(), v.trim(), v.nonEmpty("Voornaam is verplicht")),
      lastName: v.pipe(v.string(), v.trim(), v.nonEmpty("Naam is verplicht")),
      phoneNumber: v.pipe(v.string(), v.trim(), v.nonEmpty("Telefoonnummer is verplicht")),
      email: v.pipe(v.string(), v.email("E-mailadres is ongeldig")),
    }),
  }),
  v.transform((input) =>
    canJoinTheatre(input.groups) ? input : { ...input, theatre: theatreOptions[0] }
  )
);

export type Schema = v.InferOutput<typeof schema>;

export const initialState = {
  firstName: "",
  lastName: "",
  groups: [],
  photos: undefined,
  theatre: theatreOptions[0],
  contact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  },
} as unknown as Schema;
