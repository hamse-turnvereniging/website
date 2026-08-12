import assert from "node:assert/strict";
import test from "node:test";
import { isRegistrationFormVisible } from "./registration-visibility.ts";

test("shows the general registration form through 1 July 2027", () => {
  assert.equal(isRegistrationFormVisible(new Date("2027-07-01T23:59:59")), true);
});

test("hides the general registration form from 2 July 2027", () => {
  assert.equal(isRegistrationFormVisible(new Date("2027-07-02T00:00:00")), false);
});
