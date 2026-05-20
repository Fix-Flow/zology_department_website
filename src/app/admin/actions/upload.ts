"use server";

import { uploadToCloudinary, type UploadFolder } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function uploadImageAction(dataUri: string, folder: UploadFolder) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return uploadToCloudinary(dataUri, folder);
}
