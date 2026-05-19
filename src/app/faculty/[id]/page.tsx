import { notFound } from "next/navigation";
import { faculty, getFacultyById } from "@/data/faculty";
import FacultyProfile from "@/components/faculty/FacultyProfile";
import type { Metadata } from "next";
import { SITE_NAME, COLLEGE_SHORT } from "@/lib/constants";

interface FacultyProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return faculty.map((f) => ({
    id: f.id,
  }));
}

export async function generateMetadata({
  params,
}: FacultyProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const member = getFacultyById(id);

  if (!member) {
    return { title: "Faculty Not Found" };
  }

  return {
    title: `${member.name} | ${SITE_NAME} | ${COLLEGE_SHORT}`,
    description: `${member.name}, ${member.designation} at the Department of Zoology, GDC Autonomous Siddipet. Specialization: ${member.specialization.join(", ")}.`,
  };
}

export default async function FacultyProfilePage({
  params,
}: FacultyProfilePageProps) {
  const { id } = await params;
  const member = getFacultyById(id);

  if (!member) {
    notFound();
  }

  return <FacultyProfile faculty={member} />;
}
