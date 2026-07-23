import { startOfDay } from "date-fns";

const registrationFormClosedFrom = new Date("2026-07-01");

export function isRegistrationFormVisible(today: Date): boolean {
  return startOfDay(today) < startOfDay(registrationFormClosedFrom);
}
