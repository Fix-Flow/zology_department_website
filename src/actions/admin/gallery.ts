"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { GalleryCategory } from "@prisma/client";

import { z } from "zod";

const gallerySchema = z.object({
  src: z.string().url("Must be a valid URL").max(2000),
  alt: z.string().min(3, "Caption must be at least 3 characters").max(200),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  category: z.enum(["EVENT", "LAB", "MUSEUM", "FIELD_VISIT", "CAMPUS"]),
});

export type GalleryFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createGalleryImage(
  src: string,
  category: GalleryCategory,
  alt: string,
  year: number
): Promise<GalleryFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "EVENT_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = gallerySchema.safeParse({ src, category, alt, year });
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.galleryImage.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: "Image added to gallery" };
  } catch (error) {
    console.error("[createGalleryImage]", error);
    return { success: false, message: "Failed to add image" };
  }
}

export async function deleteGalleryImage(id: string): Promise<GalleryFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "EVENT_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.galleryImage.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("[deleteGalleryImage]", error);
    return { success: false, message: "Failed to delete image" };
  }
}

export async function updateGalleryImage(
  id: string,
  category: GalleryCategory,
  alt: string,
  year: number
): Promise<GalleryFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "EVENT_MANAGER"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = gallerySchema.omit({ src: true }).safeParse({ category, alt, year });
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.galleryImage.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: "Image updated successfully" };
  } catch (error) {
    console.error("[updateGalleryImage]", error);
    return { success: false, message: "Failed to update image" };
  }
}
