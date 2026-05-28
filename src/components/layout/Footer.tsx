import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import {

  SITE_NAME,
  COLLEGE_NAME,
  NAAC_GRADE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  ADDRESS,
  OFFICE_TIMINGS,
  SOCIAL_LINKS,
  COLLEGE_WEBSITE,
  FOOTER,
} from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Faculty", href: "/faculty" },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const academicLinks = [
  { label: "Syllabus", href: "/downloads" },
  { label: "Timetable", href: "/downloads" },
  { label: "Downloads", href: "/downloads" },
  { label: "Research", href: "/research" },
  { label: "Student Corner", href: "/student-corner" },
  { label: "Admissions", href: "/admissions" },
];

export default function Footer() {
  return (
    <footer data-component="Footer" className="bg-primary text-white mt-auto">
      {/* Gold accent line */}
      <div className="h-1 bg-accent" />

      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <span className="text-accent font-heading font-bold text-base">Z</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white leading-tight">
                  {SITE_NAME}
                </h3>
                <p className="text-[10px] text-white/50 leading-tight mt-0.5">
                  {COLLEGE_NAME}
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Nurturing scientific temper and academic excellence in biological
              sciences since 1985. NAAC Accredited with &lsquo;{NAAC_GRADE}&rsquo; Grade.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink href={SOCIAL_LINKS.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.twitter} label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.youtube} label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </SocialLink>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white">
              Quick Links
            </h4>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-4" />
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white">
              Academics
            </h4>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-4" />
            <ul className="space-y-2.5">
              {academicLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-white">
              Contact Us
            </h4>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-4" />
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {ADDRESS.line1}, {ADDRESS.line2}, {ADDRESS.city},{" "}
                  {ADDRESS.state} - {ADDRESS.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-accent shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-accent shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-accent shrink-0" />
                <span className="text-white/60 text-sm">
                  {OFFICE_TIMINGS.weekdays}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <ExternalLink size={15} className="text-accent shrink-0" />
                <a
                  href={COLLEGE_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  College Main Website
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-4">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-white/40 text-xs">
              {FOOTER.copyright} · {FOOTER.naacBadge}
            </p>
            <div className="flex items-center gap-4 text-white/30 text-[11px]">
              <p>{FOOTER.bestViewed}</p>
              <Link href="/admin" className="hover:text-white/60 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary-dark transition-all"
    >
      {children}
    </a>
  );
}
