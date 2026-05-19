import Link from "next/link";
import {
  Mail,
  Phone,
  BookOpen,
  Award,
  Beaker,
  GraduationCap,
  ExternalLink,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { Faculty } from "@/types/faculty";
import { getInitials } from "@/lib/utils";

interface FacultyProfileProps {
  faculty: Faculty;
}

export default function FacultyProfile({ faculty }: FacultyProfileProps) {
  return (
    <div className="section-container section-padding">
      {/* Back link */}
      <Link
        href="/faculty"
        className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to Faculty
      </Link>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left: Photo & Basic Info */}
        <div>
          <div className="card-static overflow-hidden">
            {/* Photo placeholder */}
            <div className="h-72 bg-neutral-bg flex items-center justify-center">
              <span className="text-6xl font-heading font-bold text-primary/20">
                {getInitials(faculty.name)}
              </span>
            </div>

            <div className="p-5 text-center">
              <h1 className="font-heading font-bold text-xl text-govt-text">
                {faculty.name}
              </h1>
              <p className="text-accent font-semibold text-sm mt-1">
                {faculty.designation}
              </p>
              <p className="text-xs text-govt-muted capitalize mt-0.5">
                {faculty.category.replace("-", " ")}
              </p>

              {/* Qualifications */}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {faculty.qualification.map((q) => (
                  <span
                    key={q}
                    className="inline-block px-2.5 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-full"
                  >
                    {q}
                  </span>
                ))}
              </div>

              <div className="h-px bg-govt-border my-4" />

              {/* Contact */}
              <div className="space-y-2.5 text-sm text-left">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-accent shrink-0" />
                  <a
                    href={`mailto:${faculty.email}`}
                    className="text-govt-text hover:text-primary transition-colors truncate"
                  >
                    {faculty.email}
                  </a>
                </div>
                {faculty.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-accent shrink-0" />
                    <a
                      href={`tel:${faculty.phone}`}
                      className="text-govt-text hover:text-primary transition-colors"
                    >
                      {faculty.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-accent shrink-0" />
                  <span className="text-govt-muted">
                    {faculty.experience} years experience
                  </span>
                </div>
              </div>

              {/* External Links */}
              {(faculty.googleScholar || faculty.orcid) && (
                <>
                  <div className="h-px bg-govt-border my-4" />
                  <div className="space-y-2 text-sm">
                    {faculty.googleScholar && (
                      <a
                        href={faculty.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <ExternalLink size={14} />
                        Google Scholar
                      </a>
                    )}
                    {faculty.orcid && (
                      <a
                        href={`https://orcid.org/${faculty.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <ExternalLink size={14} />
                        ORCID: {faculty.orcid}
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Detailed Info */}
        <div className="space-y-8">
          {/* Specialization */}
          {faculty.specialization.length > 0 && (
            <InfoSection
              icon={<Beaker size={18} />}
              title="Area of Specialization"
            >
              <div className="flex flex-wrap gap-2">
                {faculty.specialization.map((s) => (
                  <span
                    key={s}
                    className="badge-category"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </InfoSection>
          )}

          {/* Research Interests */}
          {faculty.researchInterests && faculty.researchInterests.length > 0 && (
            <InfoSection
              icon={<Beaker size={18} />}
              title="Research Interests"
            >
              <ul className="space-y-2">
                {faculty.researchInterests.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-govt-text"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </InfoSection>
          )}

          {/* Publications */}
          {faculty.publications > 0 && (
            <InfoSection
              icon={<BookOpen size={18} />}
              title="Research Output"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-static p-4 text-center">
                  <span className="stat-number text-2xl">{faculty.publications}</span>
                  <span className="stat-label text-xs block mt-1">Publications</span>
                </div>
                <div className="card-static p-4 text-center">
                  <span className="stat-number text-2xl">{faculty.experience}</span>
                  <span className="stat-label text-xs block mt-1">Years Experience</span>
                </div>
              </div>
            </InfoSection>
          )}

          {/* Awards */}
          {faculty.awards && faculty.awards.length > 0 && (
            <InfoSection
              icon={<Award size={18} />}
              title="Awards & Recognitions"
            >
              <ul className="space-y-2.5">
                {faculty.awards.map((award) => (
                  <li
                    key={award}
                    className="flex items-start gap-2.5 text-sm text-govt-text"
                  >
                    <Award size={14} className="text-accent mt-0.5 shrink-0" />
                    {award}
                  </li>
                ))}
              </ul>
            </InfoSection>
          )}

          {/* Qualifications Detail */}
          <InfoSection
            icon={<GraduationCap size={18} />}
            title="Qualifications"
          >
            <div className="flex flex-wrap gap-2">
              {faculty.qualification.map((q) => (
                <span
                  key={q}
                  className="inline-block px-3 py-1 bg-primary/5 text-primary text-sm font-medium rounded-lg"
                >
                  {q}
                </span>
              ))}
            </div>
          </InfoSection>
        </div>
      </div>
    </div>
  );
}

function InfoSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-static p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-body font-semibold text-base text-govt-text">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
