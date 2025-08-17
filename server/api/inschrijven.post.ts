import * as v from "valibot";

import { schema } from "../../shared/schemas/inschrijven";

export default defineEventHandler(async (event) => {
  console.log("defineEventHandler event", event);

  const validationResult = await readValidatedBody(event, (body) => v.safeParse(schema, body));
  console.log("defineEventHandler validationResult", validationResult);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.issues,
    };
  }

  return {
    success: true,
    validationErrors: null,
  };
});
