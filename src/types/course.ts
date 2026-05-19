export interface Course {
  slug: string;
  title: string;
  level: "UG" | "PG" | "Skill";
  duration: string;
  intake: number;
  eligibility: string;
  syllabusUrl?: string;
  careerOpportunities: string[];
  programmeOutcomes: string[];
  courseOutcomes: string[];
  pso: string[];
}
