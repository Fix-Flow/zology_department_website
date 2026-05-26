"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseCsv } from "@/lib/utils";

const courseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(300),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug must be at most 100 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  level: z.enum(["UG", "PG", "SKILL"]),
  duration: z.string().min(1, "Duration is required").max(100),
  intake: z.coerce.number().min(1, "Intake must be at least 1"),
  eligibility: z.string().min(2, "Eligibility is required").max(500),
  syllabusUrl: z.string().max(2000).optional(),
  careerOpportunities: z.string().max(5000).optional(), // CSV
  programmeOutcomes: z.string().max(5000).optional(), // CSV
  courseOutcomes: z.string().max(5000).optional(), // CSV
  pso: z.string().max(5000).optional(), // CSV
});

export type CourseFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};



export async function createCourse(
  _prevState: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    level: formData.get("level"),
    duration: formData.get("duration"),
    intake: formData.get("intake"),
    eligibility: formData.get("eligibility"),
    syllabusUrl: formData.get("syllabusUrl") || undefined,
    careerOpportunities: formData.get("careerOpportunities") || undefined,
    programmeOutcomes: formData.get("programmeOutcomes") || undefined,
    courseOutcomes: formData.get("courseOutcomes") || undefined,
    pso: formData.get("pso") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.course.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.course.create({
      data: {
        ...parsed.data,
        careerOpportunities: parseCsv(parsed.data.careerOpportunities, "\n"),
        programmeOutcomes: parseCsv(parsed.data.programmeOutcomes, "\n"),
        courseOutcomes: parseCsv(parsed.data.courseOutcomes, "\n"),
        pso: parseCsv(parsed.data.pso, "\n"),
      },
    });

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return { success: true, message: "Course added successfully" };
  } catch (error) {
    console.error("[createCourse]", error);
    return { success: false, message: "Failed to add course" };
  }
}

export async function updateCourse(
  id: string,
  _prevState: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    level: formData.get("level"),
    duration: formData.get("duration"),
    intake: formData.get("intake"),
    eligibility: formData.get("eligibility"),
    syllabusUrl: formData.get("syllabusUrl") || undefined,
    careerOpportunities: formData.get("careerOpportunities") || undefined,
    programmeOutcomes: formData.get("programmeOutcomes") || undefined,
    courseOutcomes: formData.get("courseOutcomes") || undefined,
    pso: formData.get("pso") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.course.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing && existing.id !== id) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.course.update({
      where: { id },
      data: {
        ...parsed.data,
        careerOpportunities: parseCsv(parsed.data.careerOpportunities, "\n"),
        programmeOutcomes: parseCsv(parsed.data.programmeOutcomes, "\n"),
        courseOutcomes: parseCsv(parsed.data.courseOutcomes, "\n"),
        pso: parseCsv(parsed.data.pso, "\n"),
      },
    });

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/courses/${parsed.data.slug}`);
    revalidatePath("/admin/courses");
    return { success: true, message: "Course updated successfully" };
  } catch (error) {
    console.error("[updateCourse]", error);
    return { success: false, message: "Failed to update course" };
  }
}

export async function deleteCourse(id: string): Promise<CourseFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.course.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return { success: true, message: "Course deleted successfully" };
  } catch (error) {
    console.error("[deleteCourse]", error);
    return { success: false, message: "Failed to delete course" };
  }
}
