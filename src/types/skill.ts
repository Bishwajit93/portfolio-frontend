export type Skill = {
  id: number;
  name: string;
  level: string;
};

export type SkillData = Omit<Skill, "id">;
