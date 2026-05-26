import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";
import FacultyPageClient from "./FacultyPageClient";

export const revalidate = 3600;

export default async function FacultyPage() {
  const facultyList = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      designation: true,
      category: true,
      qualification: true,
      experience: true,
      specialization: true,
      photo: true,
      email: true,
      phone: true,
      publications: true,
      awards: true,
      researchInterests: true,
      googleScholar: true,
      orcid: true,
      displayOrder: true,
    },
  });

  return (
    <>
      <PageHero
        title="Our Faculty"
        subtitle="Meet the experienced and dedicated faculty members of the Department of Zoology"
      />

      <FacultyPageClient facultyList={facultyList} />
    </>
  );
}
