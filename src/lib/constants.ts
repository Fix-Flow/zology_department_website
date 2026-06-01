// ============================================================
// GDC ZOOLOGY DEPARTMENT — SITE CONSTANTS
// ============================================================

export const SITE_NAME = "Department of Zoology";
export const COLLEGE_NAME =
  "Government Degree College (Autonomous), Siddipet";
export const COLLEGE_SHORT = "GDC Autonomous Siddipet";
export const NAAC_GRADE = "A";
export const ESTABLISHED_YEAR = 1985;

// ─── Contact Information ───
export const CONTACT_EMAIL = "zoology@gdcsiddipet.ac.in";
export const CONTACT_PHONE = "+91-08457-222333";
export const CONTACT_PHONE_DISPLAY = "08457-222333";
export const HOD_EMAIL = "hod.zoology@gdcsiddipet.ac.in";
export const HOD_PHONE = "";

// ─── Address ───
export const ADDRESS = {
  line1: "Department of Zoology",
  line2: "Government Degree College (Autonomous)",
  city: "Siddipet",
  district: "Siddipet",
  state: "Telangana",
  pincode: "502103",
  country: "India",
  full: "Department of Zoology, Government Degree College (Autonomous), Siddipet, Telangana - 502103, India",
};

// ─── Office Timings ───
export const OFFICE_TIMINGS = {
  weekdays: "9:00 AM – 5:00 PM",
  saturday: "9:00 AM – 1:00 PM",
  sunday: "Closed",
  holidays: "Closed on public holidays",
};

// ─── External Links ───
export const COLLEGE_WEBSITE = "https://gdcsiddipet.ac.in";
export const ADMISSIONS_URL = "https://gdcsiddipet.ac.in/admissions";

// ─── Social Media ───
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/gdcsiddipet",
  twitter: "https://twitter.com/gdcsiddipet",
  instagram: "https://instagram.com/gdcsiddipet",
  youtube: "https://youtube.com/@gdcsiddipet",
  linkedin: "https://linkedin.com/school/gdcsiddipet",
} as const;

// ─── Google Maps ───
export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Government%20Degree%20College%20Siddipet&t=&z=15&ie=UTF8&iwloc=B&output=embed";

// ─── SEO Defaults ───
export const SEO = {
  titleSuffix: "Zoology Dept | GDC Autonomous Siddipet",
  defaultDescription:
    "Official website of the Department of Zoology, Government Degree College (Autonomous), Siddipet, Telangana. Explore courses, faculty, research, and admissions.",
  ogImage: "/images/og-image.jpg",
  siteUrl: "https://zoology.gdcsiddipet.ac.in",
  locale: "en_IN",
};

// ─── Department Stats (used on homepage) ───
export const DEPT_STATS = {
  facultyCount: 12,
  studentCount: 450,
  publicationCount: 85,
  awardCount: 15,
  labCount: 7,
  courseCount: 6,
  yearsOfExcellence: new Date().getFullYear() - ESTABLISHED_YEAR,
};

// ─── Footer ───
export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} ${COLLEGE_NAME}. All rights reserved.`,
  naacBadge: `NAAC Accredited with '${NAAC_GRADE}' Grade`,
  bestViewed: "", // Removed — modern responsive websites should not tell users what browser/resolution to use
  builtBy: "Department of Zoology, GDC Siddipet",
};
