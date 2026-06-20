import { getMaterialById } from "@/data/lecture/materials";

type Input = {
  /**
   * The id of the lecture the material belongs to. Get it from the
   * `get-lectures` tool.
   */
  lectureId: string;
  /**
   * The id of the material to read. Get it from the `get-lecture-materials`
   * tool for the same lecture.
   */
  materialId: string;
};

/**
 * Get the full content of a single lecture material, including its text body
 * and any attached files (names and download urls).
 */
export default async function tool(input: Input) {
  const material = await getMaterialById(input.lectureId, input.materialId);
  if (!material) throw new Error(`Could not load material ${input.materialId}.`);
  return material;
}
