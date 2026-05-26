import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export type UploadFolder =
  | "faculty"
  | "events"
  | "gallery"
  | "notices"
  | "downloads"
  | "courses";

/**
 * Upload a file (image or PDF) to Cloudinary.
 * @param file - File buffer or base64 data URI
 * @param folder - Subfolder under "gdc-zoology/"
 * @returns Cloudinary secure URL and public ID
 */
export async function uploadToCloudinary(
  fileDataUri: string,
  folder: UploadFolder
): Promise<{ url: string; publicId: string }> {
  const isImageFolder = ["faculty", "events", "gallery"].includes(folder);
  const result = await cloudinary.uploader.upload(fileDataUri, {
    folder: `gdc-zoology/${folder}`,
    resource_type: isImageFolder ? "image" : "auto",
    transformation:
      folder === "faculty"
        ? [{ width: 400, height: 500, crop: "fill", gravity: "face" }]
        : folder === "gallery"
        ? [{ width: 1200, height: 800, crop: "limit" }]
        : undefined,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete a file from Cloudinary by its public ID.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

