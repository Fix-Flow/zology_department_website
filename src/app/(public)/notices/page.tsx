import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import NoticesPageClient from "./NoticesPageClient";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Notices & Circulars",
  description: "Stay updated with the latest departmental notices, circulars, exam schedules, and announcements.",
};

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <PageHero
        title="Notices & Circulars"
        subtitle="Official departmental announcements, exam schedules, and circulars"
      />

      <div data-component="Notices_page" className="section-container section-padding bg-neutral-bg">
        <NoticesPageClient notices={notices} />
      </div>
    </>
  );
}
