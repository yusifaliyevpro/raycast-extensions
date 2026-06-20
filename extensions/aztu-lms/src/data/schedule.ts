import { apiGet } from "@/lib/client";

export type Schedule = {
  status: "success" | "error";
  data: Record<
    string,
    Array<{
      hour_id: number;
      time: string;
      room: string | null;
      subject: string;
      teacher: string;
      group: string;
      lecture_type: number;
      lecture_type_name: string;
      week_type: number;
      week_type_name: string;
    }>
  >;
};

export const getSchedule = () => apiGet<Schedule | null>("/schedule", (d) => (d?.status === "error" ? null : d));
