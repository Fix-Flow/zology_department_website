"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { createGalleryImage } from "@/actions/admin/gallery";
import { uploadImageAction } from "@/actions/admin/upload";
import type { GalleryCategory } from "@prisma/client";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

const categories = [
  { value: "EVENT", label: "Events & Programs" },
  { value: "LAB", label: "Laboratories" },
  { value: "MUSEUM", label: "Museum" },
  { value: "FIELD_VISIT", label: "Field Visits" },
  { value: "CAMPUS", label: "Campus & Infrastructure" },
];

export default function GalleryUploadForm() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alt, setAlt] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState<GalleryCategory>("EVENT");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    try {
      setIsUploading(true);
      const dataUri = await fileToDataUri(file);
      const { url } = await uploadImageAction(dataUri, "gallery");
      setImageUrl(url);
      toast.success("Image uploaded to Cloudinary successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    setIsSaving(true);
    const result = await createGalleryImage(imageUrl, category, alt, year);
    setIsSaving(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/admin/gallery");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Gallery
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          Upload New Image
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-govt-text mb-1.5">
              Image File <span className="text-red-500">*</span>
            </label>
            
            {imageUrl ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-govt-border group bg-neutral-bg">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                  >
                    <X size={16} />
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-govt-border flex flex-col items-center justify-center bg-neutral-bg hover:bg-neutral-bg/70 transition-colors">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <label
                  htmlFor="imageUpload"
                  className={`flex flex-col items-center justify-center cursor-pointer w-full h-full ${
                    isUploading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3" />
                      <span className="text-sm font-medium text-govt-text">Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-govt-border mb-3 text-govt-muted">
                        <Upload size={20} />
                      </div>
                      <span className="text-sm font-medium text-govt-text">Click to upload image</span>
                      <span className="text-xs text-govt-muted mt-1">JPEG, PNG, WebP up to 10MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="alt" className="block text-sm font-medium text-govt-text mb-1.5">
                Caption / Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                id="alt"
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Brief description of the image"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-govt-text mb-1.5">
                Year
              </label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-govt-text mb-1.5">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isSaving || !imageUrl}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save to Gallery
              </>
            )}
          </button>
          <Link
            href="/admin/gallery"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
