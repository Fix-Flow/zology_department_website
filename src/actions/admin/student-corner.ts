"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const clubSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().default("Lightbulb"),
  displayOrder: z.coerce.number().int().default(0),
});

const achievementSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters").max(100),
  achievement: z.string().min(5, "Achievement must be at least 5 characters"),
  year: z.coerce.number().int().optional().nullable().transform(val => val === 0 ? null : val),
  icon: z.string().default("Trophy"),
});

export type StudentCornerFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ─── Clubs ───

export async function createClub(
  _prevState: StudentCornerFormState,
  formData: FormData
): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = clubSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
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
    await prisma.studentClub.create({
      data: parsed.data,
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Club created successfully" };
  } catch (error) {
    console.error("[createClub]", error);
    return { success: false, message: "Failed to create club" };
  }
}

export async function updateClub(
  id: string,
  _prevState: StudentCornerFormState,
  formData: FormData
): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = clubSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
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
    await prisma.studentClub.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Club updated successfully" };
  } catch (error) {
    console.error("[updateClub]", error);
    return { success: false, message: "Failed to update club" };
  }
}

export async function deleteClub(id: string): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.studentClub.update({
      where: { id },
      data: { isActive: false },
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Club deleted successfully" };
  } catch (error) {
    console.error("[deleteClub]", error);
    return { success: false, message: "Failed to delete club" };
  }
}

// ─── Achievements ───

export async function createAchievement(
  _prevState: StudentCornerFormState,
  formData: FormData
): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = achievementSchema.safeParse({
    studentName: formData.get("studentName"),
    achievement: formData.get("achievement"),
    year: formData.get("year"),
    icon: formData.get("icon"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.studentAchievement.create({
      data: parsed.data,
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Achievement added successfully" };
  } catch (error) {
    console.error("[createAchievement]", error);
    return { success: false, message: "Failed to add achievement" };
  }
}

export async function updateAchievement(
  id: string,
  _prevState: StudentCornerFormState,
  formData: FormData
): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = achievementSchema.safeParse({
    studentName: formData.get("studentName"),
    achievement: formData.get("achievement"),
    year: formData.get("year"),
    icon: formData.get("icon"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.studentAchievement.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Achievement updated successfully" };
  } catch (error) {
    console.error("[updateAchievement]", error);
    return { success: false, message: "Failed to update achievement" };
  }
}

export async function deleteAchievement(id: string): Promise<StudentCornerFormState> {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN", "CONTENT_EDITOR"].includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.studentAchievement.update({
      where: { id },
      data: { isActive: false },
    });
    revalidatePath("/student-corner");
    revalidatePath("/admin/student-corner");
    return { success: true, message: "Achievement deleted successfully" };
  } catch (error) {
    console.error("[deleteAchievement]", error);
    return { success: false, message: "Failed to delete achievement" };
  }
}
