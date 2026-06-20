import { getExamPassword } from "@/data/exam-password";

/**
 * Get the student's current test-exam password (a numeric code used to start
 * online test exams). Returns the active code.
 */
export default async function tool() {
  const examPassword = await getExamPassword();
  if (!examPassword) throw new Error("Could not load the exam password.");
  return examPassword;
}
