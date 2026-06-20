import { getLectureAttendanceDetails } from "@/data/lecture/attendance";

type Input = {
  /**
   * The id of the lecture to fetch detailed attendance for. Get it from the
   * `get-lectures` tool. (For an at-a-glance summary of every lecture at once,
   * use the `get-attendance` tool instead.)
   */
  lectureId: string;
};

/**
 * Get the week-by-week attendance detail for a single lecture: each lesson's
 * date, type, and status (attended / absent), plus the attendance percentage
 * and score.
 */
export default async function tool(input: Input) {
  const details = await getLectureAttendanceDetails(input.lectureId);
  if (!details) throw new Error(`Could not load attendance details for lecture ${input.lectureId}.`);
  return details;
}
