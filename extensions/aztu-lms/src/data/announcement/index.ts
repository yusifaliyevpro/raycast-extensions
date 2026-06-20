import { apiGet } from "@/lib/client";

export type Announcement = { id: string; title: string; creator: string; created_at: string; hit: string };

export const getAnnouncements = () =>
  apiGet<Announcement[] | null>("/announcements", (d) => (Array.isArray(d) ? d : null));

export type AnnouncementContent = { content: string };

export const getAnnouncementContent = (id: string) =>
  apiGet<AnnouncementContent | null>(`/announcements/${id}`, (d) => d ?? null);
