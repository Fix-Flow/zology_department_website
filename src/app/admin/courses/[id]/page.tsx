import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CourseForm from "@/components/admin/forms/CourseForm";

export const dynamic = "force-dynamic";

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });

  if (!course) notFound();

  return <CourseForm course={course} />;
}
