import { Publication } from "@/types/research";

export const publications: Publication[] = [
  {
    id: "pub-001",
    title: "Diversity and distribution of butterfly fauna in Siddipet district, Telangana",
    authors: ["K. Ramesh Kumar", "P. Sunitha Devi"],
    journal: "Journal of Entomology and Zoology Studies",
    year: 2024,
    type: "journal",
    doi: "10.22271/j.ento.2024.v12.i3.9876",
    impactFactor: 2.1,
  },
  {
    id: "pub-002",
    title: "Bioconversion efficiency of Black Soldier Fly larvae on different organic substrates",
    authors: ["R. Kavitha Reddy", "K. Ramesh Kumar"],
    journal: "Waste Management",
    year: 2024,
    type: "journal",
    doi: "10.1016/j.wasman.2024.01.015",
    impactFactor: 8.8,
  },
  {
    id: "pub-003",
    title: "Freshwater fish diversity of Manjeera River: a comprehensive survey",
    authors: ["P. Sunitha Devi", "A. Suresh Babu"],
    journal: "Indian Journal of Fisheries",
    year: 2023,
    type: "journal",
    impactFactor: 1.5,
  },
  {
    id: "pub-004",
    title: "Vermicomposting: A Sustainable Approach to Waste Management",
    authors: ["M. Venkat Reddy"],
    journal: "Springer Nature",
    year: 2023,
    type: "book",
  },
  {
    id: "pub-005",
    title: "IoT-based water quality monitoring system for aquaculture ponds",
    authors: ["A. Suresh Babu", "P. Sunitha Devi"],
    journal: "Aquaculture Engineering",
    year: 2023,
    type: "journal",
    doi: "10.1016/j.aquaeng.2023.102345",
    impactFactor: 4.2,
  },
  {
    id: "pub-006",
    title: "Host-parasite relationships in freshwater teleosts of Telangana",
    authors: ["S. Anjali Sharma", "K. Ramesh Kumar"],
    journal: "Parasitology Research",
    year: 2022,
    type: "journal",
    impactFactor: 2.7,
  },
  {
    id: "pub-007",
    title: "Earthworm diversity and soil health assessment in agricultural fields",
    authors: ["M. Venkat Reddy", "B. Lakshmi Priya"],
    journal: "Applied Soil Ecology",
    year: 2022,
    type: "journal",
    impactFactor: 4.8,
  },
  {
    id: "pub-008",
    title: "Chapter: Insect Biodiversity of Deccan Plateau",
    authors: ["K. Ramesh Kumar"],
    journal: "Biodiversity of India (Ed. R.K. Sharma), Oxford University Press",
    year: 2021,
    type: "chapter",
  },
  {
    id: "pub-009",
    title: "Antimicrobial resistance patterns in aquaculture systems of Telangana",
    authors: ["N. Deepika Jain", "S. Anjali Sharma"],
    journal: "International Conference on Aquatic Health, ICAR-CIFA",
    year: 2024,
    type: "conference",
  },
  {
    id: "pub-010",
    title: "Cytogenetic analysis of Labeo rohita populations from different river systems",
    authors: ["B. Lakshmi Priya", "P. Sunitha Devi"],
    journal: "Chromosome Research",
    year: 2021,
    type: "journal",
    impactFactor: 3.1,
  },
];

export function getPublicationsByYear(year: number): Publication[] {
  return publications.filter((p) => p.year === year);
}

export function getPublicationsByType(type: Publication["type"]): Publication[] {
  return publications.filter((p) => p.type === type);
}

export function getPublicationYears(): number[] {
  return [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
}
