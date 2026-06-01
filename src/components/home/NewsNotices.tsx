import Link from "next/link";
import { Bell, FileText, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";


const categoryColors: Record<string, string> = {
  CIRCULAR: "text-blue-600",
  EXAM: "text-red-600",
  SEMINAR: "text-purple-600",
  RESULT: "text-green-600",
  ADMISSION: "text-amber-600",
  GENERAL: "text-gray-600",
};

export default async function NewsNotices() {
  const recentNotices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
    take: 6,
  });

  return (
    <section data-component="NewsNotices" className="section-padding bg-neutral-bg">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Latest News / Highlights */}
          <div>
            <h2 className="font-heading text-section-head text-govt-text">
              Department Highlights
            </h2>
            <span className="gold-divider" />

            <div className="mt-8 space-y-5">
              <HighlightCard
                title="BSF Waste Management Unit Inaugurated"
                date="November 2024"
                description="The department's new Black Soldier Fly-based organic waste management unit was inaugurated by the District Collector, marking a milestone in sustainable campus waste processing."
                tag="Achievement"
              />
              <HighlightCard
                title="2 Students Qualify UGC NET — December 2024"
                date="January 2025"
                description="Congratulations to Ms. Priya Sharma and Mr. Anil Kumar for qualifying UGC NET in Life Sciences. The department's NET coaching programme continues to deliver results."
                tag="Student Achievement"
              />
              <HighlightCard
                title="MoU Signed with ICAR-CIFA for Aquaculture Research"
                date="October 2024"
                description="A memorandum of understanding was signed with ICAR-CIFA, Bhubaneswar for collaborative research in sustainable aquaculture and IoT-based fish farm monitoring."
                tag="Research"
              />
            </div>
          </div>

          {/* Right: Notice Board */}
          <div>
            <div className="notice-panel sticky top-28">
              <div className="notice-panel-header">
                <Bell size={16} />
                <span>Notice Board</span>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                {recentNotices.length === 0 ? (
                  <div className="p-8 text-center text-govt-muted text-sm">
                    No notices posted yet.
                  </div>
                ) : (
                  recentNotices.map((notice) => (
                    <Link
                      key={notice.id}
                      href={notice.attachmentUrl || "#"}
                      className="notice-item group"
                    >
                      <div className="shrink-0 mt-0.5">
                        <FileText
                          size={16}
                          className={categoryColors[notice.category] || "text-gray-500"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className="text-sm font-medium text-govt-text group-hover:text-primary transition-colors line-clamp-2 flex-1">
                            {notice.title}
                          </p>
                          {notice.isNew && (
                            <span className="badge-new text-[8px] px-1.5 py-0 shrink-0 mt-0.5">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-govt-muted mt-1.5">
                          {formatDate(notice.date.toISOString())}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* View All */}
              <div className="p-3.5 border-t border-govt-border text-center bg-neutral-bg/50">
                <Link
                  href="/downloads"
                  className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 group"
                >
                  View All Notices
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  title,
  date,
  description,
  tag,
}: {
  title: string;
  date: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="card-interactive p-6">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="badge-accent">{tag}</span>
        <span className="text-xs text-govt-muted font-medium">{date}</span>
      </div>
      <h3 className="font-body font-semibold text-base text-govt-text leading-snug">
        {title}
      </h3>
      <p className="mt-2.5 text-sm text-govt-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
