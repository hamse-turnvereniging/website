import assert from "node:assert/strict";
import test from "node:test";

import { calculateInschrijvingAmount } from "./inschrijving-pricing.ts";

test("returns the plain group price when no discounts apply", () => {
  const result = calculateInschrijvingAmount({
    group: "BBB",
    is60PlusAtEndOfThisYear: false,
    familyMember: { check: false },
    secondSportCheck: false,
  });

  assert.deepEqual(result, { amount: 105, discount: 0, discountedAmount: null });
});

test("stacks all applicable discounts", () => {
  const result = calculateInschrijvingAmount({
    group: "BBB",
    is60PlusAtEndOfThisYear: true,
    familyMember: { check: true },
    secondSportCheck: true,
  });

  assert.deepEqual(result, { amount: 105, discount: 15, discountedAmount: 90 });
});

test("returns a null amount when no group is set", () => {
  const result = calculateInschrijvingAmount({
    is60PlusAtEndOfThisYear: false,
    familyMember: { check: false },
    secondSportCheck: false,
  });

  assert.deepEqual(result, { amount: null, discount: 0, discountedAmount: null });
});
