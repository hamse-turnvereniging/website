import assert from "node:assert/strict";
import test from "node:test";

import * as v from "valibot";

import { canJoinTheatre, groups, schema, theatreOptions } from "./turnfeest.ts";

const validInput = {
  firstName: "Test",
  lastName: "Persoon",
  groups: ["Turnen - vanaf het 4de leerjaar (Kristoffelheem)"],
  photos: "Ja",
  theatre: theatreOptions[0],
  contact: {
    firstName: "Ouder",
    lastName: "Persoon",
    phoneNumber: "+32 400 00 00 00",
    email: "ouder@example.com",
  },
};

test("lists the youth groups of both sports halls", () => {
  assert.deepEqual(groups, [
    "Turnen - 1ste kleuterklas (Kristoffelheem)",
    "Turnen - 2de en 3de kleuterklas (Kristoffelheem)",
    "Turnen - 1ste, 2de en 3de leerjaar (Kristoffelheem)",
    "Turnen - vanaf het 4de leerjaar (Kristoffelheem)",
    "Trampoline (Kristoffelheem)",
    "Turnen - 1ste kleuterklas ('t Vlietje)",
    "Turnen - 2de en 3de kleuterklas ('t Vlietje)",
    "Turnen - 1ste, 2de en 3de leerjaar ('t Vlietje)",
  ]);
});

test("accepts a registration for several groups", () => {
  const result = v.safeParse(schema, {
    ...validInput,
    groups: ["Turnen - vanaf het 4de leerjaar (Kristoffelheem)", "Trampoline (Kristoffelheem)"],
  });

  assert.equal(result.success, true);
  assert.equal(result.output.groups.length, 2);
});

test("requires at least one group", () => {
  const result = v.safeParse(schema, { ...validInput, groups: [] });

  assert.equal(result.success, false);
  assert.equal(result.issues[0].message, "Kies minstens één groep");
});

test("rejects an unknown group", () => {
  const result = v.safeParse(schema, { ...validInput, groups: ["BBB (Kristoffelheem)"] });

  assert.equal(result.success, false);
});

test("requires an explicit answer about photos", () => {
  const result = v.safeParse(schema, { ...validInput, photos: undefined });

  assert.equal(result.success, false);
  assert.equal(result.issues[0].message, "Geef aan of er foto's gemaakt mogen worden");
});

test("only primary school groups can join the theatre", () => {
  assert.equal(canJoinTheatre(["Turnen - 1ste kleuterklas (Kristoffelheem)"]), false);
  assert.equal(canJoinTheatre(["Turnen - 2de en 3de kleuterklas ('t Vlietje)"]), false);
  assert.equal(canJoinTheatre(["Turnen - 1ste, 2de en 3de leerjaar ('t Vlietje)"]), true);
  assert.equal(canJoinTheatre(["Trampoline (Kristoffelheem)"]), true);
  assert.equal(
    canJoinTheatre([
      "Turnen - 1ste kleuterklas (Kristoffelheem)",
      "Turnen - vanaf het 4de leerjaar (Kristoffelheem)",
    ]),
    true
  );
});

test("keeps the theatre choice for a primary school group", () => {
  const result = v.safeParse(schema, { ...validInput, theatre: theatreOptions[2] });

  assert.equal(result.success, true);
  assert.equal(result.output.theatre, theatreOptions[2]);
});

test("drops the theatre choice when only preschool groups are selected", () => {
  const result = v.safeParse(schema, {
    ...validInput,
    groups: ["Turnen - 1ste kleuterklas (Kristoffelheem)"],
    theatre: theatreOptions[1],
  });

  assert.equal(result.success, true);
  assert.equal(result.output.theatre, theatreOptions[0]);
});
