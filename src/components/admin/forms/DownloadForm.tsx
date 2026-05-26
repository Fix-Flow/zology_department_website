"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import type { Download as PrismaDownload } from "@prisma/client";
import {
  createDownload,
  updateDownload,
  type DownloadFormState,
} from "@/actions/admin/downloads";

interface DownloadFormProps {
  download?: PrismaDownload;
}

const categories = [
  { value: "SYLLABUS", label: "Syllabus" },
  { value: "TIMETABLE", label: "Timetable" },
  { value: "ACADEMIC_CALENDAR", label: "Academic Calendar" },
  { value: "PREVIOUS_PAPERS", label: "Previous Question Papers" },
  { value: "LAB_MANUALS", label: "Lab Manuals" },
  { value: "NOTICES_CIRCULARS", label: "Notices & Circulars (PDF)" },
  { value: "OTHER", label: "Other Resources" },
];

const initialState: DownloadFormState = {
  success: false,
  message: "",
};

export default function DownloadForm({ download }: DownloadFormProps) {
  const router = useRouter();
  const isEditing = !!download;

  const boundAction = isEditing
    ? updateDownload.bind(null, download.id)
    : createDownload;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/downloads");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/downloads"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Downloads
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Resource" : "Add New Resource"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-govt-text mb-1.5">
              Resource Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={download?.title || ""}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            {state.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="fileSize" className="block text-sm font-medium text-govt-text mb-1.5">
              File Size (optional)
            </label>
            <input
              id="fileSize"
              name="fileSize"
              type="text"
              defaultValue={download?.fileSize || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., 2.5 MB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-govt-text mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                defaultValue={download?.category || "OTHER"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fileUrl" className="block text-sm font-medium text-govt-text mb-1.5">
                File URL (PDF, DOCX, etc.) <span className="text-red-500">*</span>
              </label>
              <input
                id="fileUrl"
                name="fileUrl"
                type="url"
                defaultValue={download?.fileUrl || ""}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="https://drive.google.com/..."
              />
              {state.errors?.fileUrl && <p className="text-red-500 text-xs mt-1">{state.errors.fileUrl[0]}</p>}
              <p className="text-xs text-govt-muted mt-2">
                Paste the public link to your Google Drive, Dropbox, or OneDrive file here.
              </p>
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
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
                {isEditing ? "Update Resource" : "Add Resource"}
              </>
            )}
          </button>
          <Link
            href="/admin/downloads"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
