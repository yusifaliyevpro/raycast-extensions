import { apiGet } from "@/lib/client";

export type ExamPassword = { success: boolean; data: number };

export const getExamPassword = () => apiGet<ExamPassword | null>("/exam-password", (d) => (d?.success ? d : null));
