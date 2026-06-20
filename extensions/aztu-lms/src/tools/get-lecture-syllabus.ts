import { getSyllabus } from "@/data/lecture/about";

type Input = {
  /**
   * The id of the lecture to fetch the syllabus for. Get it from the
   * `get-lectures` tool.
   */
  lectureId: string;
};

/**
 * Get a lecture's syllabus: credit, hours, professors, course objective,
 * teaching method, and the assessment score distribution (midterm, final,
 * attendance, etc.).
 */
export default async function tool(input: Input) {
  const syllabus = await getSyllabus(input.lectureId);
  if (!syllabus) throw new Error(`Could not load the syllabus for lecture ${input.lectureId}.`);
  return syllabus;
}
