import { getAttendance } from "@/data/attendance";

/**
 * Get the student's overall attendance summary across all lectures.
 *
 * Returns, per lecture, the attended/absent weeks, attendance percentage, and
 * attendance score (out of 10). Use this to answer questions like "what is my
 * attendance" or "which subjects am I at risk of failing for absences".
 */
export default async function tool() {
  const attendance = await getAttendance();
  if (!attendance) throw new Error("Could not load attendance.");
  return attendance;
}
