import * as v from "valibot";
import QRCode from "qrcode";

import { buildInschrijvingQrCode } from "#shared/utils/inschrijving-qr-code";

const querySchema = v.object({
  firstName: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.maxLength(100)),
  lastName: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.maxLength(100)),
  amount: v.pipe(v.string(), v.transform(Number), v.number(), v.minValue(0.01), v.maxValue(1000)),
});

export default defineEventHandler(async (event) => {
  const validationResult = v.safeParse(querySchema, getQuery(event));

  if (!validationResult.success) {
    throw createError({ statusCode: 400, statusMessage: "Ongeldige QR-code parameters" });
  }

  const { firstName, lastName, amount } = validationResult.output;
  const qrCodeText = buildInschrijvingQrCode({ firstName, lastName, amount });
  const png = await QRCode.toBuffer(qrCodeText, { type: "png", width: 300, margin: 1 });

  setHeader(event, "Content-Type", "image/png");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

  return png;
});
