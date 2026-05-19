export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: "journal" | "book" | "chapter" | "conference";
  doi?: string;
  impactFactor?: number;
}
