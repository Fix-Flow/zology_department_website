import PageHero from "@/components/ui/PageHero";
import { Download, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";


export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download syllabi, academic calendars, question papers, and official forms.",
};

export default async function DownloadsPage(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;

  const downloads = await prisma.download.findMany({
    where: { 
      isActive: true,
      ...(categoryFilter ? { category: categoryFilter } : {})
    },
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
    SYLLABUS: "Syllabus (CBCS / NEP)",
    TIMETABLE: "Timetable",
    ACADEMIC_CALENDAR: "Academic Calendar",
    PREVIOUS_PAPERS: "Previous Question Papers",
    LAB_MANUALS: "Lab Manuals",
    NOTICES_CIRCULARS: "Notices & Circulars",
    OTHER: "Other Resources"
  };

  const categories = Object.entries(grouped);

  return (
    <>
      <PageHero
        title="Downloads"
        subtitle="Access official syllabi, previous question papers, and essential forms"
      />

      <div data-component="Downloads_page" className="section-container section-padding">
        {categories.length === 0 ? (
          <p className="text-center text-govt-muted py-12">
            No downloads available yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(([category, items]) => (
              <div key={category} className="card-static flex flex-col h-full overflow-hidden relative">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-80" />
                
                <div className="p-6 border-b border-govt-border bg-neutral-bg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl text-primary bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-govt-text leading-tight">
                    {categoryLabels[category] || category}
                  </h2>
                </div>
                
                <ul className="p-5 flex-1 space-y-3">
                  {items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 text-sm text-govt-text transition-all group/item"
                      >
                        <div className="pr-4 flex-1">
                          <span className="line-clamp-2 font-medium group-hover/item:text-primary transition-colors">{item.title}</span>
                          {item.fileSize && (
                            <span className="text-[11px] font-semibold tracking-wider text-govt-muted uppercase mt-1 block">
                              {item.fileSize}
                            </span>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-govt-border/20 text-govt-muted flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:shadow-md">
                          <Download size={14} className="group-hover/item:animate-bounce" />
                        </div>
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
