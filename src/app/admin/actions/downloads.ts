"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const downloadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  fileUrl: z.string().url("Must be a valid URL"),
  fileSize: z.string().optional(),
  category: z.string().min(2, "Category is required"),
});

export type DownloadFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createDownload(
  _prevState: DownloadFormState,
  formData: FormData
): Promise<DownloadFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = downloadSchema.safeParse({
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    fileSize: formData.get("fileSize") || undefined,
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.download.create({
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/downloads");
    revalidatePath("/admin/downloads");
    return { success: true, message: "Download file added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add download file" };
  }
}

export async function updateDownload(
  id: string,
  _prevState: DownloadFormState,
  formData: FormData
): Promise<DownloadFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = downloadSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    fileUrl: formData.get("fileUrl"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.download.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/downloads");
    revalidatePath("/admin/downloads");
    return { success: true, message: "Download file updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update download file" };
  }
}

export async function deleteDownload(id: string): Promise<DownloadFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.download.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/downloads");
    revalidatePath("/admin/downloads");
    return { success: true, message: "Download file deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete download file" };
  }
}
