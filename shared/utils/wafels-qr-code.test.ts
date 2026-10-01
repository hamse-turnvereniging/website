import assert from "node:assert/strict";
import test from "node:test";

import { buildWafelsQrCode } from "./wafels-qr-code.ts";

test("builds the EPC/BCD QR payload with the club's IBAN, the amount and 'Wafels' + name as message", () => {
  const qrCode = buildWafelsQrCode({ firstName: "Jan", lastName: "Peeters", amount: 12 });

  assert.equal(
    qrCode,
    `BCD
001
1
SCT
GKCCBEBB
HAMSE TURNVERENIGING
BE69068209399078
EUR12

Wafels Jan Peeters
`
  );
});
