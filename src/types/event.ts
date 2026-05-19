export interface Event {
  slug: string;
  title: string;
  category:
    | "workshop"
    | "seminar"
    | "guest-lecture"
    | "exhibition"
    | "extension"
    | "awareness"
    | "field-visit";
  date: string;
  venue: string;
  posterImage?: string;
  reportUrl?: string;
  photos: string[];
  summary: string;
  resourcePerson?: string;
  featured: boolean;
}
