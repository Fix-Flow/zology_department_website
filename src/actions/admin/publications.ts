"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseCsv } from "@/lib/utils";

const publicationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(300),
  authors: z.string().min(3, "Authors are required").max(1000), // CSV string in form
  journal: z.string().min(2, "Journal/Publisher name is required").max(300),
  year: z.coerce.number().min(1900, "Invalid year").max(2100, "Invalid year"),
  type: z.enum(["JOURNAL", "BOOK", "CHAPTER", "CONFERENCE"]),
  doi: z.string().max(200).optional(),
  impactFactor: z.coerce.number().optional(),
});

export type PublicationFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};



export async function createPublication(
  _prevState: PublicationFormState,
  formData: FormData
): Promise<PublicationFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = publicationSchema.safeParse({
    title: formData.get("title"),
    authors: formData.get("authors"),
    journal: formData.get("journal"),
    year: formData.get("year"),
    type: formData.get("type"),
    doi: formData.get("doi") || undefined,
    impactFactor: formData.get("impactFactor") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.publication.create({
      data: {
        ...parsed.data,
        authors: parseCsv(parsed.data.authors as string),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/publications");
    return { success: true, message: "Publication added successfully" };
  } catch (error) {
    console.error("[createPublication]", error);
    return { success: false, message: "Failed to add publication" };
  }
}

export async function updatePublication(
  id: string,
  _prevState: PublicationFormState,
  formData: FormData
): Promise<PublicationFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = publicationSchema.safeParse({
    title: formData.get("title"),
    authors: formData.get("authors"),
    journal: formData.get("journal"),
    year: formData.get("year"),
    type: formData.get("type"),
    doi: formData.get("doi") || undefined,
    impactFactor: formData.get("impactFactor") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.publication.update({
      where: { id },
      data: {
        ...parsed.data,
        authors: parseCsv(parsed.data.authors as string),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/publications");
    return { success: true, message: "Publication updated successfully" };
  } catch (error) {
    console.error("[updatePublication]", error);
    return { success: false, message: "Failed to update publication" };
  }
}

export async function deletePublication(id: string): Promise<PublicationFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.publication.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/admin/publications");
    return { success: true, message: "Publication deleted successfully" };
  } catch (error) {
    console.error("[deletePublication]", error);
    return { success: false, message: "Failed to delete publication" };
  }
}
