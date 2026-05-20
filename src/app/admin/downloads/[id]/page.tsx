import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DownloadForm from "./DownloadForm";

export const dynamic = "force-dynamic";

interface EditDownloadPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDownloadPage({ params }: EditDownloadPageProps) {
  const { id } = await params;
  const download = await prisma.download.findUnique({ where: { id } });

  if (!download) notFound();

  return <DownloadForm download={download} />;
}
