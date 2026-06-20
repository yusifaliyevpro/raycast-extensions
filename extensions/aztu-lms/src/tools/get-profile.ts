import { getProfileInfo } from "@/data/profile-info";

/**
 * Get the student's profile: basic info (name, student id, contact details,
 * birthday) and academic info (course/year, status, registration type).
 */
export default async function tool() {
  const profile = await getProfileInfo();
  if (!profile) throw new Error("Could not load profile information.");
  return profile;
}
