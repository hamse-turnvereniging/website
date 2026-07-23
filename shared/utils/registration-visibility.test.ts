import assert from "node:assert/strict";
import test from "node:test";
import { isRegistrationFormVisible } from "./registration-visibility.ts";

test("shows the general registration form through 30 June 2026", () => {
  assert.equal(isRegistrationFormVisible(new Date("2026-06-30T23:59:59")), true);
});

test("hides the general registration form from 1 July 2026", () => {
  assert.equal(isRegistrationFormVisible(new Date("2026-07-01T00:00:00")), false);
});
