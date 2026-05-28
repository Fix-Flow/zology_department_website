"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import type { Publication as PrismaPublication } from "@prisma/client";
import {

  createPublication,
  updatePublication,
  type PublicationFormState,
} from "@/actions/admin/publications";

interface PublicationFormProps {
  publication?: PrismaPublication;
}

const publicationTypes = [
  { value: "JOURNAL", label: "Journal Article" },
  { value: "BOOK", label: "Book" },
  { value: "CHAPTER", label: "Book Chapter" },
  { value: "CONFERENCE", label: "Conference Proceeding" },
];

const initialState: PublicationFormState = {
  success: false,
  message: "",
};

export default function PublicationForm({ publication }: PublicationFormProps) {
  const router = useRouter();
  const isEditing = !!publication;

  const boundAction = isEditing
    ? updatePublication.bind(null, publication.id)
    : createPublication;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/publications");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div data-component="PublicationForm" className="max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/publications"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Publications
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Publication" : "Add New Publication"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-govt-text mb-1.5">
              Publication Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={publication?.title || ""}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            {state.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="authors" className="block text-sm font-medium text-govt-text mb-1.5">
              Authors (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              id="authors"
              name="authors"
              type="text"
              defaultValue={publication?.authors?.join(", ") || ""}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="J. Doe, A. Smith, etc."
            />
            {state.errors?.authors && <p className="text-red-500 text-xs mt-1">{state.errors.authors[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-govt-text mb-1.5">
                Publication Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                defaultValue={publication?.type || "JOURNAL"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
              >
                {publicationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="journal" className="block text-sm font-medium text-govt-text mb-1.5">
                Journal / Publisher / Conference Name <span className="text-red-500">*</span>
              </label>
              <input
                id="journal"
                name="journal"
                type="text"
                defaultValue={publication?.journal || ""}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {state.errors?.journal && <p className="text-red-500 text-xs mt-1">{state.errors.journal[0]}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-govt-text mb-1.5">
                Publication Year <span className="text-red-500">*</span>
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                defaultValue={publication?.year || new Date().getFullYear()}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {state.errors?.year && <p className="text-red-500 text-xs mt-1">{state.errors.year[0]}</p>}
            </div>
            <div>
              <label htmlFor="impactFactor" className="block text-sm font-medium text-govt-text mb-1.5">
                Impact Factor (optional)
              </label>
              <input
                id="impactFactor"
                name="impactFactor"
                type="number"
                step="0.01"
                min="0"
                defaultValue={publication?.impactFactor || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="doi" className="block text-sm font-medium text-govt-text mb-1.5">
                DOI / Link (optional)
              </label>
              <input
                id="doi"
                name="doi"
                type="text"
                defaultValue={publication?.doi || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="10.1000/xyz123 or https://..."
              />
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
                {isEditing ? "Update Publication" : "Add Publication"}
              </>
            )}
          </button>
          <Link
            href="/admin/publications"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
