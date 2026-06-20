import { getAnnouncements } from "@/data/announcement";

/**
 * Get the list of LMS announcements (title, author, publish date, view count).
 *
 * Each announcement has an `id`. To read the full body of a specific
 * announcement, pass that id to the `get-announcement-content` tool.
 */
export default async function tool() {
  const announcements = await getAnnouncements();
  if (!announcements) throw new Error("Could not load announcements.");
  return announcements;
}
