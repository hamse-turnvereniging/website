import assert from "node:assert/strict";
import test from "node:test";

import { buildInschrijvingQrCode } from "./inschrijving-qr-code.ts";

test("builds the EPC/BCD QR payload with the club's IBAN and the given name/amount", () => {
  const qrCode = buildInschrijvingQrCode({ firstName: "Jan", lastName: "Peeters", amount: 105 });

  assert.equal(
    qrCode,
    `BCD
001
1
SCT
GKCCBEBB
HAMSE TURNVERENIGING
BE69068209399078
EUR105

Jan Peeters
`
  );
});
