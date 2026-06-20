import { apiGet } from "@/lib/client";

export type Syllabus = {
  id: string;
  group: string;
  lecture_name: string;
  professor: {
    lecture_professor_name: string;
    training_professor_name: string;
    laboratory_professor_name: string | null;
  };
  score: string;
  hours: string;
  week: string;
  semester: string;
  student_count: string;
  lecture_plan: {
    object: string;
    url: string | null;
    teaching_method: string | null;
    scores: {
      lecture_score: string;
      training_score: string;
      laboratory_score: string | null;
      attend_percent: string;
      middle_percent: string;
      last_percent: string;
      etc_percent: string;
    };
  }[];
}[];

export const getSyllabus = (lectureId: string) =>
  apiGet<Syllabus | null>(`/lectures/${lectureId}/syllabus`, (d) => (Array.isArray(d) ? d : null));
