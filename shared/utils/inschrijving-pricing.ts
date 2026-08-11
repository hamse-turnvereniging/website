import { familyMemberDiscount, groupPrice, is60PlusAtEndOfThisYearDiscount, secondSportDiscount } from "../data/inschrijving.ts";

export function calculateInschrijvingAmount(input: {
  group?: string;
  is60PlusAtEndOfThisYear: boolean;
  familyMember: { check: boolean };
  secondSportCheck: boolean;
}) {
  const amount = (input.group && groupPrice[input.group]) ?? null;

  let discount = 0;
  discount += input.is60PlusAtEndOfThisYear ? is60PlusAtEndOfThisYearDiscount : 0;
  discount += input.familyMember.check ? familyMemberDiscount : 0;
  discount += input.secondSportCheck ? secondSportDiscount : 0;

  const discountedAmount = amount && discount ? amount - discount : null;

  return { amount, discount, discountedAmount };
}
