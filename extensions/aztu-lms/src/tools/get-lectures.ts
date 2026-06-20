import { getLectures } from "@/data/lectures";

/**
 * Get the list of the student's active lectures (subjects) this semester.
 *
 * Each lecture has an `id` that other tools (materials, syllabus, per-lecture
 * attendance) require, so call this first whenever the user refers to a subject
 * by name and you need its id.
 */
export default async function tool() {
  const lectures = await getLectures();
  if (!lectures) throw new Error("Could not load lectures.");
  return lectures;
}
