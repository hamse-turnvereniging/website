import { generate } from "@juit/qrcode";
import { eq } from "drizzle-orm";

import { calculateInschrijvingAmount } from "#shared/utils/inschrijving-pricing";
import { buildInschrijvingQrCode } from "#shared/utils/inschrijving-qr-code";
import { inschrijvingen } from "hub:db:schema";

const PUBLIC_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default defineEventHandler(async (event) => {
  const publicId = getRouterParam(event, "publicId");

  if (!publicId || !PUBLIC_ID_PATTERN.test(publicId)) {
    throw createError({ statusCode: 400, statusMessage: "Ongeldige QR-code parameters" });
  }

  const [row] = await db
    .select()
    .from(inschrijvingen)
    .where(eq(inschrijvingen.publicId, publicId))
    .limit(1);

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: "Inschrijving niet gevonden" });
  }

  const input = JSON.parse(row.data) as {
    firstName: string;
    lastName: string;
    group?: string;
    is60PlusAtEndOfThisYear: boolean;
    familyMember: { check: boolean };
    secondSportCheck: boolean;
  };

  const { amount, discountedAmount } = calculateInschrijvingAmount(input);

  if (!amount) {
    throw createError({ statusCode: 404, statusMessage: "Geen betaalgegevens voor deze inschrijving" });
  }

  const qrCodeText = buildInschrijvingQrCode({
    firstName: input.firstName,
    lastName: input.lastName,
    amount: discountedAmount ?? amount,
  });
  const png = await generate(qrCodeText, "png", { scale: 6, margin: 2 });

  setHeader(event, "Content-Type", "image/png");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

  return png;
});
