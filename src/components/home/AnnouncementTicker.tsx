import { prisma } from "@/lib/prisma";
import AnnouncementTickerClient from "./AnnouncementTickerClient";

export default async function AnnouncementTicker() {
  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
    take: 8,
    select: {
      id: true,
      title: true,
      attachmentUrl: true,
      isNew: true,
    },
  });

  if (notices.length === 0) return null;

  return <AnnouncementTickerClient notices={notices} />;
}
