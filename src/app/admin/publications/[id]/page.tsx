import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicationForm from "./PublicationForm";

export const dynamic = "force-dynamic";

interface EditPublicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPublicationPage({ params }: EditPublicationPageProps) {
  const { id } = await params;
  const publication = await prisma.publication.findUnique({ where: { id } });

  if (!publication) notFound();

  return <PublicationForm publication={publication} />;
}
