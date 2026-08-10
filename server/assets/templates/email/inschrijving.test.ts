import assert from "node:assert/strict";
import test from "node:test";

import emailTemplate from "./inschrijving.js";

const baseProps = {
  subject: "Test bevestiging",
  group: "BBB",
  location: "Kristoffelheem",
  firstName: "Test",
  lastName: "Persoon",
  gender: "Man",
  dateOfBirth: "01/01/2015",
  nationality: "Belg",
  address: {
    streetName: "Teststraat",
    houseNumber: "1",
    postalCode: "3945",
    city: "Ham",
  },
  amount: 105,
  discount: 0,
  discountedAmount: null,
  familyMember: { check: false },
  secondSportCheck: false,
  paymentCheck: true,
  photosCheck: true,
  rulesCheck: true,
  privacyCheck: true,
};

test("includes the QR-code image when qrCodeBase64 is provided", () => {
  const qrCodeBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

  const html = emailTemplate({ ...baseProps, qrCodeBase64 });

  assert.ok(
    html.includes(`<img src="${qrCodeBase64}"`),
    "expected the raw (unescaped) base64 data URL to appear in an <img> src"
  );
  assert.ok(html.includes("Scan via bank app"));
});

test("omits the QR-code row when qrCodeBase64 is missing", () => {
  const html = emailTemplate({ ...baseProps });

  assert.ok(!html.includes("Scan via bank app"));
  assert.ok(!html.includes('alt="QR-code betaling"'));
});
