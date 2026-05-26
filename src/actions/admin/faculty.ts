"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseCsv } from "@/lib/utils";

const facultySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug must be at most 100 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  designation: z.string().min(2, "Designation is required").max(200),
  category: z.enum([
    "TEACHING",
    "NON_TEACHING",
    "VISITING",
    "RESEARCH_SCHOLAR",
  ]),
  qualification: z.string().min(2, "Qualification is required").max(1000), // Stored as CSV string in form
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  specialization: z.string().max(1000).optional(), // Stored as CSV string in form
  photo: z.string().max(2000).optional(),
  email: z.string().email("Invalid email address").max(200),
  phone: z.string().max(50).optional(),
  publications: z.coerce.number().default(0),
  awards: z.string().max(5000).optional(), // Stored as CSV string in form
  researchInterests: z.string().max(5000).optional(), // Stored as CSV string in form
  googleScholar: z.string().max(2000).optional(),
  orcid: z.string().max(100).optional(),
  displayOrder: z.coerce.number().default(0),
});

export type FacultyFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};



export async function createFaculty(
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "FACULTY_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
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
    console.error("[createFaculty]", error);
    return { success: false, message: "Failed to add faculty member" };
  }
}

export async function updateFaculty(
  id: string,
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "FACULTY_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
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
    console.error("[updateFaculty]", error);
    return { success: false, message: "Failed to update faculty member" };
  }
}

export async function deleteFaculty(id: string): Promise<FacultyFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "FACULTY_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
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
    console.error("[deleteFaculty]", error);
    return { success: false, message: "Failed to delete faculty member" };
  }
}
