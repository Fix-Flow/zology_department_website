import Link from "next/link";
import { ArrowRight, Clock, Users, GraduationCap } from "lucide-react";
import { Course } from "@/types/course";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card group flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        {/* Level Badge */}
        <div className="mb-4">
          <span className="badge-category font-bold">
            {course.level === "UG" && "Undergraduate"}
            {course.level === "PG" && "Postgraduate"}
            {course.level === "Skill" && "Skill Enhancement"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl text-govt-text group-hover:text-primary transition-colors leading-snug mb-4">
          {course.title}
        </h3>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-govt-muted">
            <Clock size={16} className="text-accent shrink-0" />
            <span>{course.duration}</span>
          </div>
          {course.intake && (
            <div className="flex items-center gap-2 text-sm text-govt-muted">
              <Users size={16} className="text-accent shrink-0" />
              <span>Intake: {course.intake} seats</span>
            </div>
          )}
          <div className="flex items-start gap-2 text-sm text-govt-muted">
            <GraduationCap size={16} className="text-accent shrink-0 mt-0.5" />
            <span className="line-clamp-2" title={course.eligibility}>
              Eligibility: {course.eligibility}
            </span>
          </div>
        </div>

        {/* Footer/Link */}
        <div className="mt-auto pt-4 border-t border-govt-border">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors"
          >
            View Course Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
