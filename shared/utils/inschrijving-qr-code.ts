export function buildInschrijvingQrCode({
  firstName,
  lastName,
  amount,
}: {
  firstName: string;
  lastName: string;
  amount: number;
}): string {
  return `BCD
001
1
SCT
GKCCBEBB
HAMSE TURNVERENIGING
BE69068209399078
EUR${amount}

${firstName} ${lastName}
`;
}
