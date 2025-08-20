import * as v from "valibot";
import Handlebars from "handlebars";

import { schema } from "#shared/schemas/inschrijven";

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
    const headers = new Headers();
    headers.append("api-key", process.env.BREVO_API_KEY!);
    headers.append("Content-Type", "application/json");

    const to: { name: string; email: string }[] = [];

    if (input.group) {
      if (
        input.group === "Turnen - 1ste kleuterklas" ||
        input.group === "Turnen - 2de en 3de kleuterklas" ||
        input.group === "Turnen - 1ste, 2de en 3de leerjaar" ||
        input.group === "Turnen - 4ste, 5de en 6de leerjaar" ||
        input.group === "Trampoline"
      ) {
        to.push({
          name: `${input.parent1.firstName} ${input.parent1.lastName}`,
          email: input.parent1.email,
        });

        if (input.parent2.email) {
          to.push({
            name: `${input.parent2.firstName} ${input.parent2.lastName}`,
            email: input.parent2.email,
          });
        }
      } else if (
        input.group === "Turnen - 12+" ||
        input.group === "BBB" ||
        input.group === "Callanetics" ||
        input.group === "Net-voetbal heren"
      ) {
        to.push({
          name: `${input.firstName} ${input.lastName}`,
          email: input.email,
        });
      }
    }

    // TODO: Remove
    const serverAssetsKeys = await useStorage("assets:server").getKeys();
    console.log("serverAssetsKeys", serverAssetsKeys);

    const emailTemplate = await useStorage("assets:server").get<string>(
      "templates:email:inschrijving.hbs"
    );

    // TODO: Remove
    console.log("emailTemplate", emailTemplate);

    const compiledEmailTemplate = Handlebars.compile(emailTemplate);
    const htmlContent = compiledEmailTemplate(input);

    // TODO: Remove
    // return {
    //   error: null,
    //   success: true,
    //   validationErrors: null,
    // };

    await $fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      body: {
        // TODO: Uncomment
        // to,
        to: [
          {
            email: "beckerssteff@gmail.com",
            name: "Steff Beckers",
          },
        ],
        // TODO: Uncomment
        // bcc: [
        //   {
        //     email: "inschrijvingen@hamseturnvereniging.be",
        //     name: "Hamse Turnvereniging",
        //   },
        // ],
        replyTo: {
          email: "info@hamseturnvereniging.be",
          name: "Hamse Turnvereniging",
        },
        sender: {
          email: "inschrijvingen@hamseturnvereniging.be",
          name: "Hamse Turnvereniging",
        },
        subject: `Bevestiging inschrijving - ${input.firstName} ${input.lastName} (${input.group} - Sporthal ${input.location})`,
        htmlContent,
      },
      headers,
    });
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
