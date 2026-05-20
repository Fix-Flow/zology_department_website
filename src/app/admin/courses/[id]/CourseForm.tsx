"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import type { Course as PrismaCourse } from "@prisma/client";
import {
  createCourse,
  updateCourse,
  type CourseFormState,
} from "../../actions/courses";

interface CourseFormProps {
  course?: PrismaCourse;
}

const levels = [
  { value: "UG", label: "Undergraduate (UG)" },
  { value: "PG", label: "Postgraduate (PG)" },
  { value: "SKILL", label: "Skill Enhancement Course" },
];

const initialState: CourseFormState = {
  success: false,
  message: "",
};

export default function CourseForm({ course }: CourseFormProps) {
  const router = useRouter();
  const isEditing = !!course;

  const [title, setTitle] = useState(course?.title || "");
  const [slug, setSlug] = useState(course?.slug || "");
  const [slugEdited, setSlugEdited] = useState(isEditing);

  const boundAction = isEditing
    ? updateCourse.bind(null, course.id)
    : createCourse;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/courses");
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

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Courses
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit Course" : "Add New Course"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-govt-text mb-1.5">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text placeholder:text-govt-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g., B.Sc. Zoology (Dairy Science)"
              />
              {state.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-govt-text mb-1.5">
                Course Level <span className="text-red-500">*</span>
              </label>
              <select
                id="level"
                name="level"
                defaultValue={course?.level || "UG"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
              >
                {levels.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-govt-text mb-1.5">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                defaultValue={course?.duration || "3 Years (6 Semesters)"}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="intake" className="block text-sm font-medium text-govt-text mb-1.5">
                Intake Capacity <span className="text-red-500">*</span>
              </label>
              <input
                id="intake"
                name="intake"
                type="number"
                min="1"
                defaultValue={course?.intake || 60}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="eligibility" className="block text-sm font-medium text-govt-text mb-1.5">
              Eligibility Criteria <span className="text-red-500">*</span>
            </label>
            <input
              id="eligibility"
              name="eligibility"
              type="text"
              defaultValue={course?.eligibility || "Intermediate (10+2) with Bi.P.C"}
              required
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="syllabusUrl" className="block text-sm font-medium text-govt-text mb-1.5">
              Syllabus PDF URL (optional)
            </label>
            <input
              id="syllabusUrl"
              name="syllabusUrl"
              type="url"
              defaultValue={course?.syllabusUrl || ""}
              className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Link to PDF document"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          <h2 className="font-heading font-bold text-lg text-govt-text mb-4">Outcomes & Opportunities</h2>
          <p className="text-sm text-govt-muted mb-4">Enter each item on a new line.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="careerOpportunities" className="block text-sm font-medium text-govt-text mb-1.5">
                Career Opportunities
              </label>
              <textarea
                id="careerOpportunities"
                name="careerOpportunities"
                rows={4}
                defaultValue={course?.careerOpportunities?.join("\n") || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              />
            </div>
            <div>
              <label htmlFor="programmeOutcomes" className="block text-sm font-medium text-govt-text mb-1.5">
                Programme Outcomes (PO)
              </label>
              <textarea
                id="programmeOutcomes"
                name="programmeOutcomes"
                rows={4}
                defaultValue={course?.programmeOutcomes?.join("\n") || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              />
            </div>
            <div>
              <label htmlFor="courseOutcomes" className="block text-sm font-medium text-govt-text mb-1.5">
                Course Outcomes (CO)
              </label>
              <textarea
                id="courseOutcomes"
                name="courseOutcomes"
                rows={4}
                defaultValue={course?.courseOutcomes?.join("\n") || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              />
            </div>
            <div>
              <label htmlFor="pso" className="block text-sm font-medium text-govt-text mb-1.5">
                Programme Specific Outcomes (PSO)
              </label>
              <textarea
                id="pso"
                name="pso"
                rows={4}
                defaultValue={course?.pso?.join("\n") || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
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
                {isEditing ? "Update Course" : "Add Course"}
              </>
            )}
          </button>
          <Link
            href="/admin/courses"
            className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:text-govt-text hover:bg-neutral-bg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
