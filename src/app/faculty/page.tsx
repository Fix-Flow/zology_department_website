import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";
import FacultyPageClient from "./FacultyPageClient";

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  const facultyList = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
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
