export interface Faculty {
  id: string;
  name: string;
  designation: string;
  category: "teaching" | "non-teaching" | "visiting" | "research-scholar";
  qualification: string[];
  experience: number;
  specialization: string[];
  photo: string;
  email: string;
  phone?: string;
  publications: number;
  awards?: string[];
  researchInterests?: string[];
  googleScholar?: string;
  orcid?: string;
}
