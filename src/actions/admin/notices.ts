"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const noticeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(300),
  date: z.string().min(1, "Date is required").max(100),
  category: z.enum([
    "CIRCULAR",
    "EXAM",
    "SEMINAR",
    "RESULT",
    "ADMISSION",
    "GENERAL",
  ]),
  attachmentUrl: z.string().max(2000).optional(),
  isNew: z.boolean().default(true),
});

export type NoticeFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createNotice(
  _prevState: NoticeFormState,
  formData: FormData
): Promise<NoticeFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = noticeSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    category: formData.get("category"),
    attachmentUrl: formData.get("attachmentUrl") || undefined,
    isNew: formData.get("isNew") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.notice.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/notices");
    return { success: true, message: "Notice created successfully" };
  } catch (error) {
    console.error("[createNotice]", error);
    return { success: false, message: "Failed to create notice" };
  }
}

export async function updateNotice(
  id: string,
  _prevState: NoticeFormState,
  formData: FormData
): Promise<NoticeFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = noticeSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    category: formData.get("category"),
    attachmentUrl: formData.get("attachmentUrl") || undefined,
    isNew: formData.get("isNew") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.notice.update({
      where: { id },
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/notices");
    return { success: true, message: "Notice updated successfully" };
  } catch (error) {
    console.error("[updateNotice]", error);
    return { success: false, message: "Failed to update notice" };
  }
}

export async function deleteNotice(id: string): Promise<NoticeFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.notice.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/admin/notices");
    return { success: true, message: "Notice deleted successfully" };
  } catch (error) {
    console.error("[deleteNotice]", error);
    return { success: false, message: "Failed to delete notice" };
  }
}

export async function toggleNoticeNew(
  id: string,
  isNew: boolean
): Promise<NoticeFormState> {
  const session = await auth();
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"];
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.notice.update({
      where: { id },
      data: { isNew },
    });

    revalidatePath("/");
    revalidatePath("/admin/notices");
    return { success: true, message: `Notice marked as ${isNew ? "new" : "read"}` };
  } catch (error) {
    console.error("[toggleNoticeNew]", error);
    return { success: false, message: "Failed to update notice" };
  }
}
