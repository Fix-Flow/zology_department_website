"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type SettingsFormState = {
  success: boolean;
  message: string;
};

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const keys = [
      "HOD_NAME",
      "HOD_MESSAGE",
      "HOD_PHOTO",
      "STATS_STUDENTS",
      "STATS_FACULTY",
      "STATS_ALUMNI",
      "CONTACT_EMAIL",
      "CONTACT_PHONE",
      "CONTACT_ADDRESS",
    ];

    for (const key of keys) {
      const val = formData.get(key);
      if (val !== null) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: val.toString() },
          create: { key, value: val.toString() },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, message: "Settings updated successfully" };
  } catch (error) {
    console.error("[updateSettings]", error);
    return { success: false, message: "Failed to update settings" };
  }
}
