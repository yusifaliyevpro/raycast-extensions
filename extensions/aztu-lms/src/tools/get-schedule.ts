import { getSchedule } from "@/data/schedule";

/**
 * Get the student's weekly class schedule, grouped by weekday.
 *
 * Each class includes its time, room, subject, teacher, lecture type, and the
 * week type (`Daimi` = every week, `Üst həftə` = upper week, `Alt həftə` = lower
 * week). Day names are in Azerbaijani.
 */
export default async function tool() {
  const schedule = await getSchedule();
  if (!schedule) throw new Error("Could not load the schedule.");
  return schedule;
}
