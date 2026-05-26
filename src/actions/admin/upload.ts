"use server";

import { uploadToCloudinary, type UploadFolder } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function uploadImageAction(dataUri: string, folder: UploadFolder) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // Validate format
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
  const mimeMatch = dataUri.match(/^data:([^;]+);base64,/);
  if (!mimeMatch || !allowedMimes.includes(mimeMatch[1])) {
    throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
  }

  // Validate size (~10MB base64 = ~13.3MB string)
  const base64Data = dataUri.split(",")[1];
  const sizeInBytes = (base64Data.length * 3) / 4;
  if (sizeInBytes > 10 * 1024 * 1024) {
    throw new Error("File too large. Maximum size is 10MB.");
  }

  return uploadToCloudinary(dataUri, folder);
}
