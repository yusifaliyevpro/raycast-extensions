import { apiGet } from "@/lib/client";

export type Lecture = {
  id: string;
  class_num: string;
  lecture_name: string;
};

export const getLectures = () => apiGet<Lecture[] | null>("/lectures", (d) => (Array.isArray(d) ? d : null));
