import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  Microscope,
  Phone,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";


const quickLinks = [
  {
    label: "Syllabus",
    href: "/downloads",
    icon: <BookOpen size={24} />,
    description: "Course curriculum & structure",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Timetable",
    href: "/downloads",
    icon: <Calendar size={24} />,
    description: "Class & exam schedules",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Downloads",
    href: "/downloads",
    icon: <Download size={24} />,
    description: "Forms, manuals & reports",
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Admissions",
    href: "/admissions",
    icon: <GraduationCap size={24} />,
    description: "Apply for UG & PG courses",
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Research",
    href: "/research",
    icon: <Microscope size={24} />,
    description: "Publications & projects",
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Phone size={24} />,
    description: "Get in touch with us",
    color: "bg-teal-50 text-teal-600",
  },
];

export default function QuickLinks() {
  return (
    <section data-component="QuickLinks" className="section-padding bg-neutral-bg">
      <div className="section-container">
        <SectionHeader
          title="Quick Links"
          subtitle="Access important resources and information quickly"
          centered
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="card group flex flex-col items-center text-center p-5 hover:border-accent/30"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${link.color}`}
              >
                {link.icon}
              </div>
              <h3 className="font-body font-semibold text-sm text-govt-text group-hover:text-primary transition-colors">
                {link.label}
              </h3>
              <p className="text-[11px] text-govt-muted mt-1 leading-tight">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
