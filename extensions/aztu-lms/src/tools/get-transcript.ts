import { getTotalScores } from "@/data/scores/getScores";

/**
 * Get the student's academic transcript: a per-semester summary (credits,
 * averages, GPA) plus an overall summary across all semesters.
 *
 * Each semester row has a `sem_code`. To get the individual subject grades for
 * one semester, pass that `sem_code` to the `get-semester-scores` tool.
 */
export default async function tool() {
  const transcript = await getTotalScores();
  if (!transcript) throw new Error("Could not load the transcript.");
  return transcript;
}
