export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
  },
  { label: "Faculty", href: "/faculty" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "B.Sc. Zoology", href: "/courses/bsc-zoology" },
      { label: "B.Sc. Fisheries & Aquaculture", href: "/courses/bsc-fisheries-aquaculture" },
      { label: "M.Sc. Zoology", href: "/courses/msc-zoology" },
      { label: "Skill Courses", href: "/courses#skill-courses" },
    ],
  },
  { label: "Facilities", href: "/facilities" },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Publications", href: "/research/publications" },
      { label: "Student Projects", href: "/research/projects" },
      { label: "Patents", href: "/research/patents" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Student Corner", href: "/student-corner" },
  { label: "Admissions", href: "/admissions" },
  { label: "Placements", href: "/placements" },
  { label: "Alumni", href: "/alumni" },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Events", href: "/gallery/events" },
      { label: "Laboratory", href: "/gallery/lab" },
      { label: "Museum", href: "/gallery/museum" },
      { label: "Field Visits", href: "/gallery/field-visit" },
      { label: "Campus", href: "/gallery/campus" },
    ],
  },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];
