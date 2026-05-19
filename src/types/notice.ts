export interface Notice {
  id: string;
  title: string;
  date: string;
  category:
    | "circular"
    | "exam"
    | "seminar"
    | "result"
    | "admission"
    | "general";
  attachmentUrl?: string;
  isNew: boolean;
}
