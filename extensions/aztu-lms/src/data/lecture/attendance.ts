import { apiGet } from "@/lib/client";

export type LectureAttendance = {
  id: string;
  professor: {
    lecture_professor_name: string | null;
    training_professor_name: string | null;
    laboratory_professor_name: string | null;
  };
  semester: {
    start: string;
    end: string;
  };
  score: string;
  hours: string;
};

export const getLectureAttendance = (id: string) =>
  apiGet<LectureAttendance | null>(`/lectures/${id}/attendance`, (d) => d ?? null);

export type AttendanceDetails = {
  success: boolean;
  lecture_info: {
    dates: {
      week_num: string;
      date: string | null;
      method: string | null;
      mod_date: string | null;
    }[];
  };
  students: {
    student_id: string;
    student_name: string;
    attendance: {
      week_num: string;
      status: string | null;
    }[];
    scores: {
      total_score: number;
      attendance_percent: string;
      absentCount: string;
    };
  }[];
};

export const getLectureAttendanceDetails = (id: string) =>
  apiGet<AttendanceDetails | null>(`/lectures/${id}/attendance-detail`, (d) => d ?? null);
