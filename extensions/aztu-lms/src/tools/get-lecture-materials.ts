import { getMaterials } from "@/data/lecture/materials";

type Input = {
  /**
   * The id of the lecture to list materials for. Get it from the `get-lectures`
   * tool (each lecture has an `id`).
   */
  lectureId: string;
};

/**
 * List the materials uploaded for a lecture (title, author, upload date).
 *
 * Each material has an `id`; pass it together with the same `lectureId` to the
 * `get-material` tool to read its full content.
 */
export default async function tool(input: Input) {
  const materials = await getMaterials(input.lectureId);
  if (!materials) throw new Error(`Could not load materials for lecture ${input.lectureId}.`);
  return materials;
}
