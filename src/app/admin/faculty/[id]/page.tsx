import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FacultyForm from "./FacultyForm";

export const dynamic = "force-dynamic";

interface EditFacultyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFacultyPage({ params }: EditFacultyPageProps) {
  const { id } = await params;

  const faculty = await prisma.faculty.findUnique({ where: { id } });

  if (!faculty) {
    notFound();
  }

  return <FacultyForm faculty={faculty} />;
}
