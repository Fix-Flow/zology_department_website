"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import FacultyGrid from "@/components/faculty/FacultyGrid";
import { faculty, getFacultyByCategory } from "@/data/faculty";
import type { Faculty } from "@/types/faculty";

const categories: { id: Faculty["category"] | "all"; label: string }[] = [
  { id: "all", label: "All Faculty" },
  { id: "teaching", label: "Teaching" },
  { id: "non-teaching", label: "Non-Teaching" },
  { id: "visiting", label: "Visiting" },
  { id: "research-scholar", label: "Research Scholars" },
];

export default function FacultyPage() {
  const [activeCategory, setActiveCategory] = useState<
    Faculty["category"] | "all"
  >("all");

  const filteredFaculty =
    activeCategory === "all"
      ? faculty
      : getFacultyByCategory(activeCategory);

  return (
    <>
      <PageHero
        title="Our Faculty"
        subtitle="Meet the experienced and dedicated faculty members of the Department of Zoology"
      />

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
                  ? faculty.length
                  : getFacultyByCategory(cat.id as Faculty["category"]).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        <FacultyGrid facultyList={filteredFaculty} />
      </div>
    </>
  );
}
