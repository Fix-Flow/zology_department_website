"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const facultySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  designation: z.string().min(2, "Designation is required"),
  category: z.enum([
    "TEACHING",
    "NON_TEACHING",
    "VISITING",
    "RESEARCH_SCHOLAR",
  ]),
  qualification: z.string().min(2, "Qualification is required"), // Stored as CSV string in form
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  specialization: z.string().optional(), // Stored as CSV string in form
  photo: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  publications: z.coerce.number().default(0),
  awards: z.string().optional(), // Stored as CSV string in form
  researchInterests: z.string().optional(), // Stored as CSV string in form
  googleScholar: z.string().optional(),
  orcid: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

export type FacultyFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// Helper to convert comma-separated string to array
function parseCsv(str?: string | null): string[] {
  if (!str) return [];
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createFaculty(
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = facultySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    designation: formData.get("designation"),
    category: formData.get("category"),
    qualification: formData.get("qualification"),
    experience: formData.get("experience"),
    specialization: formData.get("specialization"),
    photo: formData.get("photo") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    publications: formData.get("publications"),
    awards: formData.get("awards") || undefined,
    researchInterests: formData.get("researchInterests") || undefined,
    googleScholar: formData.get("googleScholar") || undefined,
    orcid: formData.get("orcid") || undefined,
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.faculty.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.faculty.create({
      data: {
        ...parsed.data,
        qualification: parseCsv(parsed.data.qualification),
        specialization: parseCsv(parsed.data.specialization),
        awards: parseCsv(parsed.data.awards),
        researchInterests: parseCsv(parsed.data.researchInterests),
      },
    });

    revalidatePath("/");
    revalidatePath("/faculty");
    revalidatePath("/admin/faculty");
    return { success: true, message: "Faculty member added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add faculty member" };
  }
}

export async function updateFaculty(
  id: string,
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = facultySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    designation: formData.get("designation"),
    category: formData.get("category"),
    qualification: formData.get("qualification"),
    experience: formData.get("experience"),
    specialization: formData.get("specialization"),
    photo: formData.get("photo") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    publications: formData.get("publications"),
    awards: formData.get("awards") || undefined,
    researchInterests: formData.get("researchInterests") || undefined,
    googleScholar: formData.get("googleScholar") || undefined,
    orcid: formData.get("orcid") || undefined,
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.faculty.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing && existing.id !== id) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.faculty.update({
      where: { id },
      data: {
        ...parsed.data,
        qualification: parseCsv(parsed.data.qualification),
        specialization: parseCsv(parsed.data.specialization),
        awards: parseCsv(parsed.data.awards),
        researchInterests: parseCsv(parsed.data.researchInterests),
      },
    });

    revalidatePath("/");
    revalidatePath("/faculty");
    revalidatePath(`/faculty/${parsed.data.slug}`);
    revalidatePath("/admin/faculty");
    return { success: true, message: "Faculty member updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update faculty member" };
  }
}

export async function deleteFaculty(id: string): Promise<FacultyFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.faculty.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/faculty");
    revalidatePath("/admin/faculty");
    return { success: true, message: "Faculty member deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete faculty member" };
  }
}
