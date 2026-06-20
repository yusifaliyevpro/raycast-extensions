import { apiGet } from "@/lib/client";

export type ProfileInfo = {
  basicInfo: {
    userId: number;
    name: string;
    surname: string;
    fatherName: string;
    gender: string;
    phone: string | null;
    mobilePhone: string;
    address: string | null;
    birthday: string | null;
  };
  academicInfo: {
    course: string;
    status: string;
    registerType: string;
  };
  additionalInfo: {
    photo: null;
  };
};

export const getProfileInfo = () => apiGet<ProfileInfo | null>("/profile", (d) => (d?.basicInfo ? d : null));
