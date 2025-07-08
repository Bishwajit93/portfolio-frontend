export type Education = {
  id: number;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  grade: string;
  description: string;
};

export type EducationData = Omit<Education, "id">;
