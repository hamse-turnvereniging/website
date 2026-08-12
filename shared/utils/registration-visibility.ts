import { startOfDay } from "date-fns";

const registrationFormClosedFrom = new Date("2027-07-01");

export function isRegistrationFormVisible(today: Date): boolean {
  return startOfDay(today) <= startOfDay(registrationFormClosedFrom);
}
