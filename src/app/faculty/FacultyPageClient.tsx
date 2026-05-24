"use client";

import { useState } from "react";
import FacultyGrid from "@/components/faculty/FacultyGrid";

interface FacultyMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  category: string;
  qualification: string[];
  experience: number;
  specialization: string[];
  photo: string | null;
  email: string;
  phone: string | null;
  publications: number;
  awards: string[];
  researchInterests: string[];
  googleScholar: string | null;
  orcid: string | null;
  displayOrder: number;
}

const categories = [
  { id: "all", label: "All Faculty" },
  { id: "TEACHING", label: "Teaching" },
  { id: "NON_TEACHING", label: "Non-Teaching" },
  { id: "VISITING", label: "Visiting" },
  { id: "RESEARCH_SCHOLAR", label: "Research Scholars" },
];

export default function FacultyPageClient({
  facultyList,
}: {
  facultyList: FacultyMember[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaculty =
    activeCategory === "all"
      ? facultyList
      : facultyList.filter((f) => f.category === activeCategory);

  // Map DB shape to the shape FacultyGrid/FacultyCard expects
  const mapped = filteredFaculty.map((f) => ({
    id: f.slug,
    name: f.name,
    designation: f.designation,
    category: f.category.toLowerCase().replace("_", "-") as any,
    qualification: f.qualification,
    experience: f.experience,
    specialization: f.specialization,
    photo: f.photo || undefined,
    email: f.email,
    phone: f.phone || undefined,
    publications: f.publications,
    awards: f.awards,
    researchInterests: f.researchInterests,
    googleScholar: f.googleScholar || undefined,
    orcid: f.orcid || undefined,
  }));

  return (
    <div className="section-container section-padding">
      {/* Category Tabs */}
      <div className="tab-group mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`tab-item ${
              activeCategory === cat.id ? "active" : ""
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-xs text-govt-muted">
              (
              {cat.id === "all"
                ? facultyList.length
                : facultyList.filter((f) => f.category === cat.id).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Faculty Grid */}
      <FacultyGrid facultyList={mapped} />
    </div>
  );
}
