import { apiGet } from "@/lib/client";

export type Attendance = {
  lecture_id: string;
  lecture_name: string;
  total_weeks: number;
  attended_weeks: number;
  absent_weeks: number;
  attendance_percent: string;
  attendance_score: number;
};

export const getAttendance = () => apiGet<Attendance[] | null>("/attendance", (d) => (Array.isArray(d) ? d : null));
