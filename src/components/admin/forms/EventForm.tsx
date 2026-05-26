"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Event as PrismaEvent } from "@prisma/client";
import {
  createEvent,
  updateEvent,
  type EventFormState,
} from "@/actions/admin/events";
import { uploadImageAction } from "@/actions/admin/upload";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

interface EventFormProps {
  event?: PrismaEvent;
}

const categories = [
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "GUEST_LECTURE", label: "Guest Lecture" },
  { value: "EXHIBITION", label: "Exhibition" },
  { value: "EXTENSION", label: "Extension Program" },
  { value: "AWARENESS", label: "Awareness Campaign" },
  { value: "FIELD_VISIT", label: "Field Visit" },
];

const initialState: EventFormState = {
  success: false,
  message: "",
};

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title || "");
  const [slug, setSlug] = useState(event?.slug || "");
  const [slugEdited, setSlugEdited] = useState(isEditing);

  const [posterUrl, setPosterUrl] = useState(event?.posterImage || "");
  const [isUploading, setIsUploading] = useState(false);

  const boundAction = isEditing
    ? updateEvent.bind(null, event.id)
    : createEvent;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/events");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }, [title, slugEdited]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const dataUri = await fileToDataUri(file);
      const { url } = await uploadImageAction(dataUri, "events");
      setPosterUrl(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Events
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Event" : "Create New Event"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          {/* Title & Slug Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {state.errors?.title && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.title[0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugEdited(true);
                }}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono"
              />
              {state.errors?.slug && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.slug[0]}
                </p>
              )}
            </div>
          </div>

          {/* Date & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                defaultValue={
                  event?.date
                    ? new Date(event.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                defaultValue={event?.category || "WORKSHOP"}
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

          {/* Venue & Resource Person Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Venue <span className="text-red-500">*</span>
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                defaultValue={event?.venue}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., Zoology Lab, Room 102"
              />
            </div>
            <div>
              <label
                htmlFor="resourcePerson"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Resource Person{" "}
                <span className="text-govt-muted font-normal">(optional)</span>
              </label>
              <input
                id="resourcePerson"
                name="resourcePerson"
                type="text"
                defaultValue={event?.resourcePerson || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Name of guest or speaker"
              />
            </div>
          </div>

          {/* Poster Image Upload */}
          <div>
            <label className="block text-sm font-medium text-govt-text mb-1.5">
              Poster / Cover Image
            </label>
            <input type="hidden" name="posterImage" value={posterUrl} />

            <div className="flex items-start gap-4">
              {posterUrl ? (
                <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-govt-border group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posterUrl}
                    alt="Poster Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setPosterUrl("")}
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-40 h-24 rounded-lg border-2 border-dashed border-govt-border flex flex-col items-center justify-center bg-neutral-bg">
                  <Upload size={20} className="text-govt-muted mb-1" />
                  <span className="text-xs text-govt-muted">Upload Image</span>
                </div>
              )}

              <div className="flex-1">
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
                  className={`inline-flex items-center gap-2 px-4 py-2 border border-govt-border rounded-lg text-sm font-medium cursor-pointer hover:bg-neutral-bg transition-colors ${
                    isUploading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Choose Image
                    </>
                  )}
                </label>
                <p className="text-xs text-govt-muted mt-2">
                  Recommended size: 1200x800px. Max 5MB (JPEG, PNG, WebP).
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-govt-text mb-1.5"
            >
              Event Summary / Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={4}
              defaultValue={event?.summary}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              placeholder="Provide a detailed description of the event..."
            />
            {state.errors?.summary && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.summary[0]}
              </p>
            )}
          </div>

          {/* Report URL */}
          <div>
            <label
              htmlFor="reportUrl"
              className="block text-sm font-medium text-govt-text mb-1.5"
            >
              Full Report URL{" "}
              <span className="text-govt-muted font-normal">(optional)</span>
            </label>
            <input
              id="reportUrl"
              name="reportUrl"
              type="url"
              defaultValue={event?.reportUrl || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Link to a PDF or external page"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              value="true"
              defaultChecked={event?.featured ?? false}
              className="w-4 h-4 rounded border-govt-border text-primary focus:ring-primary/20"
            />
            <label htmlFor="featured" className="text-sm text-govt-text">
              Mark as <strong>Featured</strong>{" "}
              <span className="text-govt-muted">
                (Highlights this event on the home page)
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isPending || isUploading}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEditing ? "Update Event" : "Create Event"}
              </>
            )}
          </button>
          <Link
            href="/admin/events"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
