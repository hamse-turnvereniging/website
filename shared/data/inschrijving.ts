export const genders: string[] = ["Man", "Vrouw", "X"];

export const groupPrice: { [group: string]: number } = {
  "Turnen - 1ste kleuterklas": 85,
  "Turnen - 2de en 3de kleuterklas": 85,
  "Turnen - 1ste, 2de en 3de leerjaar": 85,
  "Turnen - 4ste, 5de en 6de leerjaar": 95,
  Trampoline: 95,
  BBB: 105,
  Callanetics: 105,
  "Net-voetbal": 105,
};

export const defaultDiscount = 5;
export const is60PlusAtEndOfThisYearDiscount = defaultDiscount;
export const familyMemberDiscount = defaultDiscount;
export const secondSportDiscount = defaultDiscount;

export const locationGroups: { [location: string]: string[] } = {
  Kristoffelheem: [
    "Turnen - 1ste kleuterklas",
    "Turnen - 2de en 3de kleuterklas",
    "Turnen - 1ste, 2de en 3de leerjaar",
    "Turnen - 4ste, 5de en 6de leerjaar",
    "Trampoline",
    "BBB",
    "Callanetics",
    "Net-voetbal",
  ],
  "'t Vlietje": [
    "Turnen - 1ste kleuterklas",
    "Turnen - 2de en 3de kleuterklas",
    "Turnen - 1ste, 2de en 3de leerjaar",
  ],
};
