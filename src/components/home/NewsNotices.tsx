import Link from "next/link";
import { Bell, FileText, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import NoticeBoardClient from "./NoticeBoardClient";


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
            <NoticeBoardClient notices={recentNotices} />
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
