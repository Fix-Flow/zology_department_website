import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  Microscope,
  Phone,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";


const quickLinks = [
  {
    label: "Syllabus",
    href: "/downloads",
    icon: <BookOpen size={26} />,
    description: "Course curriculum & structure",
    color: "bg-blue-50 text-blue-600",
    hoverBorder: "group-hover:border-blue-200",
  },
  {
    label: "Timetable",
    href: "/downloads",
    icon: <Calendar size={26} />,
    description: "Class & exam schedules",
    color: "bg-amber-50 text-amber-600",
    hoverBorder: "group-hover:border-amber-200",
  },
  {
    label: "Downloads",
    href: "/downloads",
    icon: <Download size={26} />,
    description: "Forms, manuals & reports",
    color: "bg-green-50 text-green-600",
    hoverBorder: "group-hover:border-green-200",
  },
  {
    label: "Admissions",
    href: "/admissions",
    icon: <GraduationCap size={26} />,
    description: "Apply for UG & PG courses",
    color: "bg-purple-50 text-purple-600",
    hoverBorder: "group-hover:border-purple-200",
  },
  {
    label: "Research",
    href: "/research",
    icon: <Microscope size={26} />,
    description: "Publications & projects",
    color: "bg-rose-50 text-rose-600",
    hoverBorder: "group-hover:border-rose-200",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Phone size={26} />,
    description: "Get in touch with us",
    color: "bg-teal-50 text-teal-600",
    hoverBorder: "group-hover:border-teal-200",
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

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`card group flex flex-col items-center text-center p-6 ${link.hoverBorder}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${link.color}`}
              >
                {link.icon}
              </div>
              <h3 className="font-body font-semibold text-sm text-govt-text group-hover:text-primary transition-colors">
                {link.label}
              </h3>
              <p className="text-[11px] text-govt-muted mt-1.5 leading-snug">
                {link.description}
              </p>
              {/* Hover arrow indicator */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <ArrowRight size={14} className="text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
