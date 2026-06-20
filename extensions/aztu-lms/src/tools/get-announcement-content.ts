import { getAnnouncementContent } from "@/data/announcement";

type Input = {
  /**
   * The id of the announcement to read. Get it from the `get-announcements`
   * tool (each announcement in that list has an `id`).
   */
  id: string;
};

/**
 * Get the full body/content of a single announcement by its id.
 */
export default async function tool(input: Input) {
  const content = await getAnnouncementContent(input.id);
  if (!content) throw new Error(`Could not load announcement ${input.id}.`);
  return content;
}
