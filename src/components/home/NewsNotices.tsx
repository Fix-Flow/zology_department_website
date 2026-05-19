import Link from "next/link";
import { Bell, FileText, ArrowRight } from "lucide-react";
import { getRecentNotices } from "@/data/notices";
import { formatDate } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  circular: "text-blue-600",
  exam: "text-red-600",
  seminar: "text-purple-600",
  result: "text-green-600",
  admission: "text-amber-600",
  general: "text-gray-600",
};

export default function NewsNotices() {
  const recentNotices = getRecentNotices(6);

  return (
    <section className="section-padding bg-neutral-bg">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Latest News / Highlights */}
          <div>
            <h2 className="font-heading text-section-head text-govt-text">
              Department Highlights
            </h2>
            <span className="gold-divider" />

            <div className="mt-6 space-y-4">
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
                {recentNotices.map((notice) => (
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
                      <p className="text-xs text-govt-muted mt-1">
                        {formatDate(notice.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All */}
              <div className="p-3 border-t border-govt-border text-center">
                <Link
                  href="/downloads"
                  className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  View All Notices
                  <ArrowRight size={14} />
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
    <div className="card-static p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge-accent text-[10px]">{tag}</span>
        <span className="text-xs text-govt-muted">{date}</span>
      </div>
      <h3 className="font-body font-semibold text-base text-govt-text leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm text-govt-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
