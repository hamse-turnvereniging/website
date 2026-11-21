import { inschrijvingenTurnfeest } from "hub:db:schema";
import * as v from "valibot";

import emailTemplate from "~~/server/assets/templates/email/inschrijven/turnfeest";
import { schema, theatreOptions } from "~~/shared/schemas/inschrijven/turnfeest";

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
    await db.insert(inschrijvingenTurnfeest).values({
      data: JSON.stringify({ ...input, type: "Turnfeest 2027" }),
      createdAt: new Date(),
    });

    const headers = new Headers();
    headers.append("api-key", process.env.BREVO_API_KEY!);
    headers.append("Content-Type", "application/json");

    const to: { name: string; email: string }[] = [
      {
        name: `${input.contact.firstName} ${input.contact.lastName}`,
        email: input.contact.email,
      },
    ];

    const subject = `Bevestiging inschrijving - Turnfeest 2027 - ${input.firstName} ${input.lastName}`;

    const htmlContent = emailTemplate({
      ...input,
      subject,
      joinsTheatre: input.theatre !== theatreOptions[0],
    });

    await $fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      body: {
        to,
        bcc: [
          {
            email: "info@hamseturnvereniging.be",
            name: "Hamse Turnvereniging",
          },
        ],
        replyTo: {
          email: "info@hamseturnvereniging.be",
          name: "Hamse Turnvereniging",
        },
        sender: {
          email: "inschrijvingen@hamseturnvereniging.be",
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
