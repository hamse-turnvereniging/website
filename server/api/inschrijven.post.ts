import * as v from "valibot";

import { schema } from "../../shared/schemas/inschrijven";

export default defineEventHandler(async (event) => {
  console.log("defineEventHandler event", event);

  const validationResult = await readValidatedBody(event, (body) => v.safeParse(schema, body));
  console.log("defineEventHandler validationResult", validationResult);

  if (!validationResult.success) {
    return {
      error: null,
      success: false,
      validationErrors: validationResult.issues,
    };
  }

  try {
    const headers = new Headers();
    headers.append("api-key", process.env.BREVO_API_KEY!);
    headers.append("Content-Type", "application/json");

    const response = await $fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      body: {
        sender: { email: "steff@steffbeckers.com", name: "Steff Beckers" },
        to: [
          {
            email: validationResult.output.email,
            name: `${validationResult.output.firstName} ${validationResult.output.lastName}`,
          },
        ],
        subject: "Inschrijving Hamse Turnvereniging",
        htmlContent: "<p>Dit is een test.</p>",
      },
      headers,
    });

    console.log("defineEventHandler response", response);
  } catch (error) {
    return {
      error,
      success: false,
      validationErrors: null,
    };
  }

  return {
    error: null,
    success: true,
    validationErrors: null,
  };
});
