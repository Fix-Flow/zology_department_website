"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import type { Notice as PrismaNotice } from "@prisma/client";
import {
  createNotice,
  updateNotice,
  type NoticeFormState,
} from "@/actions/admin/notices";

interface NoticeFormProps {
  notice?: PrismaNotice;
}

const categories = [
  { value: "CIRCULAR", label: "Circular" },
  { value: "EXAM", label: "Exam" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "RESULT", label: "Result" },
  { value: "ADMISSION", label: "Admission" },
  { value: "GENERAL", label: "General" },
];

const initialState: NoticeFormState = {
  success: false,
  message: "",
};

export default function NoticeForm({ notice }: NoticeFormProps) {
  const router = useRouter();
  const isEditing = !!notice;

  const boundAction = isEditing
    ? updateNotice.bind(null, notice.id)
    : createNotice;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/notices");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Notices
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Notice" : "Create New Notice"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-govt-text mb-1.5"
            >
              Notice Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={notice?.title}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="e.g., Internal Examination Schedule — November 2024"
            />
            {state.errors?.title && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          {/* Date & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-govt-text mb-1.5"
              >
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                defaultValue={
                  notice?.date
                    ? new Date(notice.date).toISOString().split("T")[0]
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
                defaultValue={notice?.category || "GENERAL"}
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

          {/* Attachment URL */}
          <div>
            <label
              htmlFor="attachmentUrl"
              className="block text-sm font-medium text-govt-text mb-1.5"
            >
              Attachment URL{" "}
              <span className="text-govt-muted font-normal">(optional)</span>
            </label>
            <input
              id="attachmentUrl"
              name="attachmentUrl"
              type="url"
              defaultValue={notice?.attachmentUrl || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="https://res.cloudinary.com/..."
            />
          </div>

          {/* Is New Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="isNew"
              name="isNew"
              type="checkbox"
              value="true"
              defaultChecked={notice?.isNew ?? true}
              className="w-4 h-4 rounded border-govt-border text-primary focus:ring-primary/20"
            />
            <label htmlFor="isNew" className="text-sm text-govt-text">
              Mark as <strong>NEW</strong>{" "}
              <span className="text-govt-muted">
                (shows the NEW badge on the website)
              </span>
            </label>
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
                {isEditing ? "Update Notice" : "Create Notice"}
              </>
            )}
          </button>
          <Link
            href="/admin/notices"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
