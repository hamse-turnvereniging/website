import * as v from "valibot";

import bevestigingInschrijvingEmailTemplate from "~~/server/assets/templates/email/bevestiging-inschrijving";
import { groupPrice } from "#shared/data/inschrijving";
import { schema } from "#shared/schemas/inschrijving";
import { tables, useDrizzle } from "../utils/drizzle";

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
      .insert(tables.inschrijvingen)
      .values({
        data: JSON.stringify(input),
        createdAt: new Date(),
      });

    // Send email
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

    const subject = `Bevestiging inschrijving - ${input.firstName} ${input.lastName} (${input.group} - Sporthal ${input.location})`;
    const amount = input.group && groupPrice[input.group];
    const discount = input.is60PlusAtEndOfThisYear || input.familyMember.check ? 5 : 0;
    const discountedAmount = amount && discount ? amount - discount : null;

    const htmlContent = bevestigingInschrijvingEmailTemplate({
      ...input,
      subject,
      amount,
      discount,
      discountedAmount,
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
