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
      { label: "Alumni", href: "/" }, //change it to /alumni later
      { label: "Research Scholars / Project Students", href: "/" }, //change it to /research-scholars later
      { label: "Supporting Staff", href: "/faculty/staff" },
    ],
  },
  {
    label: "Research & Innovation",
    href: "/", //change it to /research later
    children: [
      { label: "Publications", href: "/publications" },
      { label: "Projects", href: "/" }, //change it to /projects later
      { label: "Zoology Museum", href: "/facilities/museum" },
      { label: "Biodiversity Documentation", href: "/" }, //change it to /biodiversity later
      { label: "BSF & Vermicomposting", href: "/facilities/vermicomposting" },
      { label: "Fisheries & Aquaculture Lab", href: "/facilities/aquaculture" },
      { label: "Student Research", href: "/" }, //change it to /student-research later
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
      { label: "Placements", href: "/" }, //change it to /placements later
    ],
  },
  { label: "Contact", href: "/contact" },
];
