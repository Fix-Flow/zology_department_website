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
    children: [
      { label: "Department Profile", href: "/about" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "HoD Message", href: "/about/hod" },
      { label: "Objectives", href: "/about/objectives" },
      { label: "Infrastructure", href: "/facilities" },
      { label: "Achievements", href: "/about/achievements" },
    ],
  },
  {
    label: "Academics",
    href: "/courses",
    children: [
      { label: "Courses Offered", href: "/courses" },
      { label: "Syllabus", href: "/downloads?category=SYLLABUS" },
      { label: "Programme Outcomes", href: "/courses/programme-outcomes" },
      { label: "Course Outcomes", href: "/courses/course-outcomes" },
      { label: "Time Tables", href: "/downloads?category=TIMETABLE" },
      { label: "Academic Calendar", href: "/downloads?category=ACADEMIC_CALENDAR" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    label: "People",
    href: "/faculty",
    children: [
      { label: "Faculty", href: "/faculty" },
      { label: "Students", href: "/student-corner" },
      { label: "Alumni", href: "/alumni" },
      { label: "Research Scholars / Project Students", href: "/research-scholars" },
      { label: "Supporting Staff", href: "/faculty/staff" },
    ],
  },
  {
    label: "Research & Innovation",
    href: "/research",
    children: [
      { label: "Publications", href: "/publications" },
      { label: "Projects", href: "/projects" },
      { label: "Zoology Museum", href: "/facilities/museum" },
      { label: "Biodiversity Documentation", href: "/biodiversity" },
      { label: "BSF & Vermicomposting", href: "/facilities/vermicomposting" },
      { label: "Fisheries & Aquaculture Lab", href: "/facilities/aquaculture" },
      { label: "Student Research", href: "/student-research" },
    ],
  },
  {
    label: "Activities",
    href: "/events",
    children: [
      { label: "Events", href: "/events" },
      { label: "Workshops", href: "/events?type=workshop" },
      { label: "Field Visits", href: "/events?type=field-visit" },
      { label: "Extension Activities", href: "/events?type=extension" },
      { label: "Student Corner", href: "/student-corner" },
      { label: "Gallery", href: "/gallery" },
      { label: "Placements", href: "/placements" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
