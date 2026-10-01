import { generate } from "@juit/qrcode";
import { eq } from "drizzle-orm";

import { calculateAmount, type Schema } from "#shared/schemas/bestellen/wafels";
import { buildWafelsQrCode } from "#shared/utils/wafels-qr-code";
import { bestellingen } from "hub:db:schema";

const PUBLIC_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default defineEventHandler(async (event) => {
  const publicId = getRouterParam(event, "publicId");

  if (!publicId || !PUBLIC_ID_PATTERN.test(publicId)) {
    throw createError({ statusCode: 400, statusMessage: "Ongeldige QR-code parameters" });
  }

  const [row] = await db
    .select()
    .from(bestellingen)
    .where(eq(bestellingen.publicId, publicId))
    .limit(1);

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: "Bestelling niet gevonden" });
  }

  const input = JSON.parse(row.data) as Schema;

  const amount = calculateAmount(input.wafels);

  if (!amount) {
    throw createError({ statusCode: 404, statusMessage: "Geen betaalgegevens voor deze bestelling" });
  }

  const qrCodeText = buildWafelsQrCode({
    firstName: input.firstName,
    lastName: input.lastName,
    amount,
  });
  const png = await generate(qrCodeText, "png", { scale: 6, margin: 2 });

  setHeader(event, "Content-Type", "image/png");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

  return png;
});
