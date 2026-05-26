"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Faculty as PrismaFaculty } from "@prisma/client";
import {
  createFaculty,
  updateFaculty,
  type FacultyFormState,
} from "@/actions/admin/faculty";
import { uploadImageAction } from "@/actions/admin/upload";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

interface FacultyFormProps {
  faculty?: PrismaFaculty;
}

const categories = [
  { value: "TEACHING", label: "Teaching Staff" },
  { value: "NON_TEACHING", label: "Non-Teaching Staff" },
  { value: "VISITING", label: "Visiting Faculty" },
  { value: "RESEARCH_SCHOLAR", label: "Research Scholar" },
];

const initialState: FacultyFormState = {
  success: false,
  message: "",
};

export default function FacultyForm({ faculty }: FacultyFormProps) {
  const router = useRouter();
  const isEditing = !!faculty;

  const [name, setName] = useState(faculty?.name || "");
  const [slug, setSlug] = useState(faculty?.slug || "");
  const [slugEdited, setSlugEdited] = useState(isEditing);

  const [photoUrl, setPhotoUrl] = useState(faculty?.photo || "");
  const [isUploading, setIsUploading] = useState(false);

  const boundAction = isEditing
    ? updateFaculty.bind(null, faculty.id)
    : createFaculty;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/faculty");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugEdited) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }, [name, slugEdited]);

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
      const { url } = await uploadImageAction(dataUri, "faculty");
      setPhotoUrl(url);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/faculty"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Faculty Directory
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Faculty Profile" : "Add Faculty Member"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          {/* Top Section: Photo + Basic Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo Upload */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-govt-text mb-1.5">
                Profile Photo
              </label>
              <input type="hidden" name="photo" value={photoUrl} />

              <div className="flex flex-col gap-3">
                {photoUrl ? (
                  <div className="relative w-48 h-60 rounded-xl overflow-hidden border border-govt-border group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setPhotoUrl("")}
                        className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-60 rounded-xl border-2 border-dashed border-govt-border flex flex-col items-center justify-center bg-neutral-bg">
                    <Upload size={24} className="text-govt-muted mb-2" />
                    <span className="text-sm text-govt-muted">Upload Photo</span>
                  </div>
                )}

                <div>
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
                        Choose Photo
                      </>
                    )}
                  </label>
                  <p className="text-xs text-govt-muted mt-2">
                    400x500px suggested. Max 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Details */}
            <div className="w-full md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-govt-text mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
                </div>
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-govt-text mb-1.5">
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
                    className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono"
                  />
                  {state.errors?.slug && <p className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-govt-text mb-1.5">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    defaultValue={faculty?.designation}
                    required
                    className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="e.g., Assistant Professor"
                  />
                  {state.errors?.designation && <p className="text-red-500 text-xs mt-1">{state.errors.designation[0]}</p>}
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-govt-text mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={faculty?.category || "TEACHING"}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-govt-text mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={faculty?.email}
                    required
                    className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-govt-text mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    defaultValue={faculty?.phone || ""}
                    className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          <h2 className="font-heading font-bold text-lg text-govt-text">Academic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-govt-text mb-1.5">
                Qualifications (comma separated) <span className="text-red-500">*</span>
              </label>
              <input
                id="qualification"
                name="qualification"
                type="text"
                defaultValue={faculty?.qualification?.join(", ")}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="M.Sc., Ph.D., NET"
              />
              {state.errors?.qualification && <p className="text-red-500 text-xs mt-1">{state.errors.qualification[0]}</p>}
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-govt-text mb-1.5">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                defaultValue={faculty?.experience || 0}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-govt-text mb-1.5">
              Specializations (comma separated)
            </label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              defaultValue={faculty?.specialization?.join(", ") || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Ecology, Fisheries, etc."
            />
          </div>

          <div>
            <label htmlFor="researchInterests" className="block text-sm font-medium text-govt-text mb-1.5">
              Research Interests (comma separated)
            </label>
            <input
              id="researchInterests"
              name="researchInterests"
              type="text"
              defaultValue={faculty?.researchInterests?.join(", ") || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label htmlFor="awards" className="block text-sm font-medium text-govt-text mb-1.5">
              Awards & Recognition (comma separated)
            </label>
            <textarea
              id="awards"
              name="awards"
              rows={2}
              defaultValue={faculty?.awards?.join(", ") || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="publications" className="block text-sm font-medium text-govt-text mb-1.5">
                Number of Publications
              </label>
              <input
                id="publications"
                name="publications"
                type="number"
                min="0"
                defaultValue={faculty?.publications || 0}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="googleScholar" className="block text-sm font-medium text-govt-text mb-1.5">
                Google Scholar URL
              </label>
              <input
                id="googleScholar"
                name="googleScholar"
                type="url"
                defaultValue={faculty?.googleScholar || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="orcid" className="block text-sm font-medium text-govt-text mb-1.5">
                ORCID ID
              </label>
              <input
                id="orcid"
                name="orcid"
                type="text"
                defaultValue={faculty?.orcid || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="0000-0000-0000-0000"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="displayOrder" className="block text-sm font-medium text-govt-text mb-1.5">
              Display Order <span className="text-govt-muted font-normal">(lower numbers appear first)</span>
            </label>
            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              defaultValue={faculty?.displayOrder || 0}
              className="w-32 px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
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
                {isEditing ? "Update Faculty Member" : "Add Faculty Member"}
              </>
            )}
          </button>
          <Link
            href="/admin/faculty"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
