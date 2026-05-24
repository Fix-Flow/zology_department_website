import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FacultyProfile from "@/components/faculty/FacultyProfile";
import type { Metadata } from "next";
import { SITE_NAME, COLLEGE_SHORT } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface FacultyProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const faculty = await prisma.faculty.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return faculty.map((f) => ({ id: f.slug }));
}

export async function generateMetadata({
  params,
}: FacultyProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const member = await prisma.faculty.findUnique({ where: { slug: id } });

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
  const member = await prisma.faculty.findUnique({ where: { slug: id } });

  if (!member || !member.isActive) {
    notFound();
  }

  // Map DB shape to the shape FacultyProfile expects
  const mapped = {
    id: member.slug,
    name: member.name,
    designation: member.designation,
    category: member.category.toLowerCase().replace("_", "-") as any,
    qualification: member.qualification,
    experience: member.experience,
    specialization: member.specialization,
    photo: member.photo || undefined,
    email: member.email,
    phone: member.phone || undefined,
    publications: member.publications,
    awards: member.awards,
    researchInterests: member.researchInterests,
    googleScholar: member.googleScholar || undefined,
    orcid: member.orcid || undefined,
  };

  return <FacultyProfile faculty={mapped} />;
}
