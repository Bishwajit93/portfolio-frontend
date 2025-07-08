export type Experience = {
  id: number;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
  still_working: boolean;
  description: string;
  location: string;
};

export type ExperienceData = Omit<Experience, "id">;
