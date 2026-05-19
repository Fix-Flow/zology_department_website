import { GalleryImage } from "@/types/gallery";

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-001",
    src: "/images/gallery/events/bsf-workshop-1.jpg",
    alt: "BSF Technology Workshop — participants in hands-on session",
    category: "event",
    eventSlug: "national-workshop-bsf-technology-2024",
    year: 2024,
  },
  {
    id: "gallery-002",
    src: "/images/gallery/labs/zoology-lab-1.jpg",
    alt: "Zoology Laboratory — students performing dissection practicals",
    category: "lab",
    year: 2024,
  },
  {
    id: "gallery-003",
    src: "/images/gallery/labs/fisheries-lab-1.jpg",
    alt: "Fisheries Laboratory — aquaculture tanks and equipment",
    category: "lab",
    year: 2024,
  },
  {
    id: "gallery-004",
    src: "/images/gallery/events/env-day-1.jpg",
    alt: "World Environment Day 2024 — tree plantation drive",
    category: "event",
    eventSlug: "world-environment-day-2024",
    year: 2024,
  },
  {
    id: "gallery-005",
    src: "/images/gallery/campus/campus-front-1.jpg",
    alt: "GDC Siddipet campus — main building facade",
    category: "campus",
    year: 2024,
  },
  {
    id: "gallery-006",
    src: "/images/gallery/events/museum-exhibition-1.jpg",
    alt: "Zoology Museum Exhibition — specimen display for school students",
    category: "museum",
    eventSlug: "exhibition-zoology-museum-2024",
    year: 2024,
  },
  {
    id: "gallery-007",
    src: "/images/gallery/events/zoo-visit-1.jpg",
    alt: "Field visit to Nehru Zoological Park — students observing animals",
    category: "field-visit",
    eventSlug: "field-visit-nehru-zoo-park",
    year: 2024,
  },
  {
    id: "gallery-008",
    src: "/images/gallery/labs/museum-specimens-1.jpg",
    alt: "Zoology Museum — vertebrate skeletal specimens",
    category: "museum",
    year: 2023,
  },
  {
    id: "gallery-009",
    src: "/images/gallery/events/aqua-seminar-1.jpg",
    alt: "Aquaculture Innovations Seminar — keynote speaker session",
    category: "event",
    eventSlug: "seminar-aquaculture-innovations",
    year: 2024,
  },
  {
    id: "gallery-010",
    src: "/images/gallery/campus/dept-entrance-1.jpg",
    alt: "Zoology Department entrance — signage and corridor",
    category: "campus",
    year: 2023,
  },
  {
    id: "gallery-011",
    src: "/images/gallery/events/vermi-workshop-1.jpg",
    alt: "Vermicomposting Workshop — earthworm bed demonstration",
    category: "event",
    eventSlug: "workshop-vermicomposting-2024",
    year: 2024,
  },
  {
    id: "gallery-012",
    src: "/images/gallery/labs/smart-classroom-1.jpg",
    alt: "Smart Classroom — interactive digital learning session",
    category: "lab",
    year: 2024,
  },
];

export function getGalleryByCategory(category: GalleryImage["category"]): GalleryImage[] {
  return galleryImages.filter((img) => img.category === category);
}

export function getGalleryByYear(year: number): GalleryImage[] {
  return galleryImages.filter((img) => img.year === year);
}
