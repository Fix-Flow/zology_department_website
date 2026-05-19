import { Event } from "@/types/event";

export const events: Event[] = [
  {
    slug: "national-workshop-bsf-technology-2024",
    title: "National Workshop on Black Soldier Fly Technology",
    category: "workshop",
    date: "2024-11-15",
    venue: "Zoology Seminar Hall, GDC Siddipet",
    posterImage: "/images/gallery/events/bsf-workshop-poster.jpg",
    reportUrl: "/docs/events/bsf-workshop-report.pdf",
    photos: [
      "/images/gallery/events/bsf-workshop-1.jpg",
      "/images/gallery/events/bsf-workshop-2.jpg",
      "/images/gallery/events/bsf-workshop-3.jpg",
    ],
    summary:
      "A two-day national workshop on Black Soldier Fly (BSF) technology for organic waste management, attended by faculty and students from 15 colleges. Hands-on training in BSF rearing, harvesting, and product applications was provided.",
    resourcePerson: "Dr. A. Krishna Murthy, ICAR-NBAIR, Bengaluru",
    featured: true,
  },
  {
    slug: "world-environment-day-2024",
    title: "World Environment Day Celebration 2024",
    category: "awareness",
    date: "2024-06-05",
    venue: "College Auditorium & Campus",
    photos: [
      "/images/gallery/events/env-day-1.jpg",
      "/images/gallery/events/env-day-2.jpg",
    ],
    summary:
      "The department organized an awareness rally, tree plantation drive, and poster exhibition on the theme 'Land Restoration, Desertification and Drought Resilience'. 200+ students participated in the event.",
    featured: true,
  },
  {
    slug: "guest-lecture-wildlife-conservation",
    title: "Guest Lecture on Wildlife Conservation in Telangana",
    category: "guest-lecture",
    date: "2024-09-20",
    venue: "Zoology Seminar Hall",
    photos: ["/images/gallery/events/wildlife-lecture-1.jpg"],
    summary:
      "Dr. R. Srinivas, IFS, Chief Wildlife Warden of Telangana, delivered a guest lecture on conservation efforts for endangered species in Telangana state forests.",
    resourcePerson: "Dr. R. Srinivas, IFS, Chief Wildlife Warden, Telangana",
    featured: true,
  },
  {
    slug: "field-visit-nehru-zoo-park",
    title: "Field Visit to Nehru Zoological Park, Hyderabad",
    category: "field-visit",
    date: "2024-08-12",
    venue: "Nehru Zoological Park, Hyderabad",
    photos: [
      "/images/gallery/events/zoo-visit-1.jpg",
      "/images/gallery/events/zoo-visit-2.jpg",
      "/images/gallery/events/zoo-visit-3.jpg",
    ],
    summary:
      "B.Sc. II Year students visited Nehru Zoological Park to study animal diversity, behaviour patterns, and conservation breeding programmes. Students documented observations on 40+ species.",
    featured: false,
  },
  {
    slug: "seminar-aquaculture-innovations",
    title: "State-level Seminar on Innovations in Aquaculture",
    category: "seminar",
    date: "2024-07-10",
    venue: "College Auditorium",
    posterImage: "/images/gallery/events/aqua-seminar-poster.jpg",
    reportUrl: "/docs/events/aqua-seminar-report.pdf",
    photos: [
      "/images/gallery/events/aqua-seminar-1.jpg",
      "/images/gallery/events/aqua-seminar-2.jpg",
    ],
    summary:
      "A one-day state-level seminar highlighting IoT-based smart aquaculture, biofloc technology, and RAS systems. Industry experts and researchers from OU, KU, and ICAR-CIFA participated.",
    resourcePerson: "Dr. B. Madhusudhan Rao, ICAR-CIFA, Bhubaneswar",
    featured: true,
  },
  {
    slug: "exhibition-zoology-museum-2024",
    title: "Annual Zoology Museum Exhibition",
    category: "exhibition",
    date: "2024-02-20",
    venue: "Zoology Museum, GDC Siddipet",
    photos: [
      "/images/gallery/events/museum-exhibition-1.jpg",
      "/images/gallery/events/museum-exhibition-2.jpg",
    ],
    summary:
      "The annual museum exhibition showcased the department's specimen collection to school students from Siddipet district. Over 300 specimens of invertebrates and vertebrates were displayed with educational posters.",
    featured: false,
  },
  {
    slug: "extension-activity-village-health-camp",
    title: "Extension Activity: Village Health & Hygiene Camp",
    category: "extension",
    date: "2024-03-15",
    venue: "Dubbak Village, Siddipet District",
    photos: ["/images/gallery/events/health-camp-1.jpg"],
    summary:
      "NSS volunteers and zoology students organized a health and hygiene awareness camp in Dubbak village. Activities included water quality testing, sanitation awareness, and deworming awareness sessions.",
    featured: false,
  },
  {
    slug: "workshop-vermicomposting-2024",
    title: "Hands-on Workshop: Vermicomposting for Beginners",
    category: "workshop",
    date: "2024-04-22",
    venue: "Vermi Tech Unit, GDC Siddipet",
    photos: [
      "/images/gallery/events/vermi-workshop-1.jpg",
      "/images/gallery/events/vermi-workshop-2.jpg",
    ],
    summary:
      "A practical workshop on setting up vermicomposting units, organized as part of Earth Day celebrations. Participants included students and local farmers from Siddipet mandal.",
    resourcePerson: "Dr. M. Venkat Reddy, GDC Siddipet",
    featured: false,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured);
}

export function getEventsByCategory(
  category: Event["category"]
): Event[] {
  return events.filter((e) => e.category === category);
}
