import * as v from "valibot";

import emailTemplate from "~~/server/assets/templates/email/reserveren/eetdag";
import { schema } from "~~/shared/schemas/reserveren/eetdag";
import { tables, useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async (event) => {
  const validationResult = await readValidatedBody(event, (body) => v.safeParse(schema, body));

  if (!validationResult.success) {
    return {
      error: null,
      success: false,
      validationErrors: validationResult.issues,
    };
  }

  const input = validationResult.output;

  try {
    // Save to database
    await useDrizzle()
      .insert(tables.reservaties)
      .values({
        data: JSON.stringify({ ...input, type: "Eetdag" }),
        createdAt: new Date(),
      });

    // Send email
    const headers = new Headers();
    headers.append("api-key", process.env.BREVO_API_KEY!);
    headers.append("Content-Type", "application/json");

    const to: { name: string; email: string }[] = [
      {
        name: `${input.firstName} ${input.lastName}`,
        email: input.email,
      },
    ];

    // TODO: Date as const variable
    const subject = `Bevestiging reservatie - Eetdag 01/03/2026 - ${input.firstName} ${input.lastName}`;

    // TODO: Calculate amount
    const amount = 0;

    const htmlContent = emailTemplate({
      ...input,
      subject,
      amount,
    });

    await $fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      body: {
        // TODO: Uncomment
        // to,
        // TODO: Remove
        to: [
          { email: "steff@steffbeckers.com", name: "Steff Beckers" },
          { email: "beckerssteff@gmail.com", name: "Steff Beckers" },
        ],
        // TODO: Uncomment
        // bcc: [
        //   {
        //     email: "info@hamseturnvereniging.be",
        //     name: "Hamse Turnvereniging",
        //   },
        // ],
        sender: {
          email: "info@hamseturnvereniging.be",
          name: "Hamse Turnvereniging",
        },
        subject,
        htmlContent,
      },
      headers,
    });
  } catch (error) {
    console.error(error);

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
