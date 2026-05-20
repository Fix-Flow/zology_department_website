"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { GalleryCategory } from "@prisma/client";

export type GalleryFormState = {
  success: boolean;
  message: string;
};

export async function createGalleryImage(
  src: string,
  category: GalleryCategory,
  alt: string,
  year: number
): Promise<GalleryFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.galleryImage.create({
      data: {
        src,
        category,
        alt,
        year,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, message: "Image added to gallery" };
  } catch (error) {
    return { success: false, message: "Failed to add image" };
  }
}

export async function deleteGalleryImage(id: string): Promise<GalleryFormState> {
  const session = await auth();
  if (!session?.user) {
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
    return { success: false, message: "Failed to delete image" };
  }
}
