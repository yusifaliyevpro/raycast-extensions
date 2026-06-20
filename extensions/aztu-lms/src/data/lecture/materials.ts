import { apiGet, apiGetBytes } from "@/lib/client";

export type Material = {
  id: string;
  title: string;
  creator: string;
  created_at: string;
};

export const getMaterials = (lectureId: string) =>
  apiGet<Material[] | null>(`/lectures/${lectureId}/materials`, (d) => (Array.isArray(d) ? d : null));

export type MaterialDetails = {
  id: string;
  title: string;
  creator: string;
  created_at: string;
  content: string;
  files: {
    file1: {
      name: string | null;
      url: string | null;
    };
    file2: {
      name: string | null;
      url: string | null;
    };
  };
  group: null;
};

export const getMaterialById = (lectureId: string, materialId: string) =>
  apiGet<MaterialDetails | null>(`/lectures/${lectureId}/materials/${materialId}`, (d) => d ?? null);

export const getMaterialDocumentById = (fileUrl: string) =>
  apiGetBytes(`/secure-download/materials/${encodeURIComponent(fileUrl)}`);
