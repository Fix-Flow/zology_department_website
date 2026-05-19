import Link from "next/link";
import { Mail, BookOpen, ArrowRight } from "lucide-react";
import { Faculty } from "@/types/faculty";
import { getInitials } from "@/lib/utils";

interface FacultyCardProps {
  faculty: Faculty;
}

export default function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <Link
      href={`/faculty/${faculty.id}`}
      className="card group overflow-hidden"
    >
      {/* Photo */}
      <div className="h-52 bg-neutral-bg relative overflow-hidden">
        {/* Placeholder with initials */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <span className="text-4xl font-heading font-bold text-primary/20">
            {getInitials(faculty.name)}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="badge-category capitalize text-[10px]">
            {faculty.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-body font-semibold text-card-title text-govt-text group-hover:text-primary transition-colors leading-snug">
          {faculty.name}
        </h3>
        <p className="text-sm text-accent font-medium mt-0.5">
          {faculty.designation}
        </p>

        {/* Qualifications */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {faculty.qualification.slice(0, 3).map((q) => (
            <span
              key={q}
              className="inline-block px-2 py-0.5 bg-neutral-bg text-govt-muted text-[11px] font-medium rounded-md"
            >
              {q}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-3 pt-3 border-t border-govt-border flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-govt-muted">
            {faculty.email && (
              <span className="flex items-center gap-1">
                <Mail size={12} />
                <span className="hidden sm:inline truncate max-w-[120px]">
                  {faculty.email.split("@")[0]}
                </span>
              </span>
            )}
            {faculty.publications > 0 && (
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                {faculty.publications}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-primary group-hover:text-primary-dark flex items-center gap-0.5">
            Profile <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
