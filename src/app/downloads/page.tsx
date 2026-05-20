import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download syllabi, academic calendars, question papers, and official forms.",
};

const categories = [
  {
    title: "Syllabus (CBCS / NEP)",
    icon: <BookOpen />,
    items: [
      { name: "B.Sc. Zoology Syllabus (NEP 2020)", url: "#" },
      { name: "B.Sc. Fisheries & Aquaculture Syllabus", url: "#" },
      { name: "M.Sc. Zoology Syllabus", url: "#" },
      { name: "Skill Enhancement Course (SEC) - Aquarium", url: "#" },
      { name: "Skill Enhancement Course (SEC) - Vermiculture", url: "#" },
    ]
  },
  {
    title: "Previous Question Papers",
    icon: <FileText />,
    items: [
      { name: "B.Sc. Zoology Sem-I & II (2023-24)", url: "#" },
      { name: "B.Sc. Zoology Sem-III & IV (2023-24)", url: "#" },
      { name: "B.Sc. Zoology Sem-V & VI (2023-24)", url: "#" },
      { name: "M.Sc. Zoology All Semesters (2022-24)", url: "#" },
    ]
  },
  {
    title: "Forms & Proformas",
    icon: <CheckCircle2 />,
    items: [
      { name: "Student Study Project Proposal Form", url: "#" },
      { name: "Field Visit Permission Form", url: "#" },
      { name: "M.Sc. Dissertation Guidelines", url: "#" },
      { name: "No Dues Certificate (Department)", url: "#" },
    ]
  }
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Downloads"
        subtitle="Access official syllabi, previous question papers, and essential forms"
      />

      <div className="section-container section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <div key={idx} className="card-static flex flex-col h-full">
              <div className="p-6 border-b border-govt-border bg-neutral-bg rounded-t-xl flex items-center gap-3">
                <div className="text-primary">{category.icon}</div>
                <h2 className="font-heading font-bold text-lg text-govt-text">{category.title}</h2>
              </div>
              <ul className="p-4 flex-1">
                {category.items.map((item, i) => (
                  <li key={i} className="mb-2 last:mb-0">
                    <a
                      href={item.url}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-primary/5 text-sm text-govt-muted hover:text-primary transition-colors group"
                    >
                      <span className="line-clamp-2 pr-4">{item.name}</span>
                      <Download size={16} className="text-govt-border group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BookOpen() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
