import { getSemesterScores } from "@/data/scores/getSemesterScores";

type Input = {
  /**
   * The semester code to fetch subject grades for. Get it from the
   * `get-transcript` tool — each semester row there has a `sem_code`.
   */
  semCode: string;
};

/**
 * Get the per-subject grades for a single semester (subject name, credit,
 * pre-exam score, exam score, total, letter grade, and whether it was retaken).
 */
export default async function tool(input: Input) {
  const scores = await getSemesterScores(input.semCode);
  if (!scores) throw new Error(`Could not load scores for semester ${input.semCode}.`);
  return scores;
}
