import PageHero from "@/components/ui/PageHero";
import { Download, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download syllabi, academic calendars, question papers, and official forms.",
};

export default async function DownloadsPage() {
  const downloads = await prisma.download.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      fileUrl: true,
      fileSize: true,
      createdAt: true,
    },
  });

  // Group downloads by category
  const grouped = downloads.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof downloads>);

  const categoryLabels: Record<string, string> = {
    Syllabus: "Syllabus (CBCS / NEP)",
    Timetable: "Timetable",
    "Academic Calendar": "Academic Calendar",
    "Previous Papers": "Previous Question Papers",
    "Lab Manuals": "Lab Manuals",
    "Forms": "Forms & Proformas",
  };

  const categories = Object.entries(grouped);

  return (
    <>
      <PageHero
        title="Downloads"
        subtitle="Access official syllabi, previous question papers, and essential forms"
      />

      <div className="section-container section-padding">
        {categories.length === 0 ? (
          <p className="text-center text-govt-muted py-12">
            No downloads available yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(([category, items]) => (
              <div key={category} className="card-static flex flex-col h-full">
                <div className="p-6 border-b border-govt-border bg-neutral-bg rounded-t-xl flex items-center gap-3">
                  <div className="text-primary">
                    <FileText size={24} />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-govt-text">
                    {categoryLabels[category] || category}
                  </h2>
                </div>
                <ul className="p-4 flex-1">
                  {items.map((item) => (
                    <li key={item.id} className="mb-2 last:mb-0">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-md hover:bg-primary/5 text-sm text-govt-muted hover:text-primary transition-colors group"
                      >
                        <div className="pr-4">
                          <span className="line-clamp-2 block">{item.title}</span>
                          {item.fileSize && (
                            <span className="text-xs text-govt-muted/60 mt-0.5 block">
                              {item.fileSize}
                            </span>
                          )}
                        </div>
                        <Download size={16} className="text-govt-border group-hover:text-primary transition-colors shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
