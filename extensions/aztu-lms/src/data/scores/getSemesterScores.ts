import { apiGet } from "@/lib/client";

export type SemesterScores = {
  results: Array<{
    semester_name: string;
    major_type: string;
    lecture_name: string;
    score: string;
    total_score_new: number;
    last_score: string;
    total_score: string;
    grade: string;
    again_yn: string;
  }>;
};

export const getSemesterScores = (semCode: string) =>
  apiGet<SemesterScores | null>(`/scores/${semCode}`, (d) => (d?.results ? d : null));
