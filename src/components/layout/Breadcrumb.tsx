"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Maps route segments to readable labels.
 */
const segmentLabels: Record<string, string> = {
  about: "About",
  faculty: "Faculty",
  courses: "Courses",
  facilities: "Facilities",
  research: "Research",
  publications: "Publications",
  projects: "Student Projects",
  patents: "Patents",
  events: "Events",
  "student-corner": "Student Corner",
  admissions: "Admissions",
  placements: "Placements",
  alumni: "Alumni",
  gallery: "Gallery",
  downloads: "Downloads",
  contact: "Contact",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label =
      segmentLabels[segment] ||
      segment
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-govt-border"
    >
      <div className="section-container py-2.5">
        <ol className="flex items-center gap-1.5 text-sm flex-wrap">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-govt-muted hover:text-primary transition-colors"
            >
              <Home size={14} />
              <span className="hidden xs:inline">Home</span>
            </Link>
          </li>

          {breadcrumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="text-govt-muted/50" />
              {crumb.isLast ? (
                <span className="text-primary font-semibold truncate max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-govt-muted hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
