export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "event" | "lab" | "museum" | "field-visit" | "campus";
  eventSlug?: string;
  year: number;
}
