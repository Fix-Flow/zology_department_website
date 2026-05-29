import Link from "next/link";
import { Mail, BookOpen, ArrowUpRight, ArrowRight } from "lucide-react";
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
      <div data-component="FacultyCard" className="h-64 bg-neutral-bg relative overflow-hidden">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300 z-10 pointer-events-none" />
        {faculty.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faculty.photo}
            alt={faculty.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
            <span className="text-4xl font-heading font-bold text-primary/20">
              {getInitials(faculty.name)}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="badge-category capitalize text-[10px]">
            {faculty.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-body font-semibold text-base text-govt-text group-hover:text-primary transition-colors leading-snug">
            {faculty.name}
          </h3>
          <p className="text-xs text-accent font-medium mt-0.5">
            {faculty.designation}
          </p>
        </div>
        
        {/* Profile Arrow */}
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
          <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
