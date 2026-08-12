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

test("includes the QR-code image when qrCodeImageUrl is provided", () => {
  const qrCodeImageUrl =
    "https://www.hamseturnvereniging.be/api/inschrijven/qr-code?firstName=Test&lastName=Persoon&amount=105";

  const html = emailTemplate({ ...baseProps, qrCodeImageUrl });

  assert.ok(
    html.includes(
      '<img src="https://www.hamseturnvereniging.be/api/inschrijven/qr-code?firstName&#x3D;Test&amp;lastName&#x3D;Persoon&amp;amount&#x3D;105"'
    ),
    "expected the hosted QR image URL to appear in an <img> src, HTML-escaped"
  );
  assert.ok(html.includes("Scan via bank app"));
});

test("omits the QR-code row when qrCodeImageUrl is missing", () => {
  const html = emailTemplate({ ...baseProps });

  assert.ok(!html.includes("Scan via bank app"));
  assert.ok(!html.includes('alt="QR-code betaling"'));
});
