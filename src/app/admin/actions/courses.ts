"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  level: z.enum(["UG", "PG", "SKILL"]),
  duration: z.string().min(1, "Duration is required"),
  intake: z.coerce.number().min(1, "Intake must be at least 1"),
  eligibility: z.string().min(2, "Eligibility is required"),
  syllabusUrl: z.string().optional(),
  careerOpportunities: z.string().optional(), // CSV
  programmeOutcomes: z.string().optional(), // CSV
  courseOutcomes: z.string().optional(), // CSV
  pso: z.string().optional(), // CSV
});

export type CourseFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function parseCsv(str?: string | null): string[] {
  if (!str) return [];
  return str
    .split("\n") // allow multi-line since these can be long
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createCourse(
  _prevState: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  const session = await auth();
  if (!session?.user) {
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
        careerOpportunities: parseCsv(parsed.data.careerOpportunities),
        programmeOutcomes: parseCsv(parsed.data.programmeOutcomes),
        courseOutcomes: parseCsv(parsed.data.courseOutcomes),
        pso: parseCsv(parsed.data.pso),
      },
    });

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    return { success: true, message: "Course added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add course" };
  }
}

export async function updateCourse(
  id: string,
  _prevState: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  const session = await auth();
  if (!session?.user) {
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
        careerOpportunities: parseCsv(parsed.data.careerOpportunities),
        programmeOutcomes: parseCsv(parsed.data.programmeOutcomes),
        courseOutcomes: parseCsv(parsed.data.courseOutcomes),
        pso: parseCsv(parsed.data.pso),
      },
    });

    revalidatePath("/");
    revalidatePath("/courses");
    revalidatePath(`/courses/${parsed.data.slug}`);
    revalidatePath("/admin/courses");
    return { success: true, message: "Course updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update course" };
  }
}

export async function deleteCourse(id: string): Promise<CourseFormState> {
  const session = await auth();
  if (!session?.user) {
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
    return { success: false, message: "Failed to delete course" };
  }
}
