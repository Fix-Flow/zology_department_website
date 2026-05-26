import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NoticeForm from "@/components/admin/forms/NoticeForm";

export const dynamic = "force-dynamic";

interface EditNoticePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNoticePage({ params }: EditNoticePageProps) {
  const { id } = await params;

  const notice = await prisma.notice.findUnique({ where: { id } });

  if (!notice) {
    notFound();
  }

  return <NoticeForm notice={notice} />;
}
