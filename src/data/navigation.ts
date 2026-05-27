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
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "HoD Message", href: "/about#hod-message" },
      { label: "History of Department", href: "/about#history" },
      { label: "Infrastructure", href: "/about#facilities" },
      { label: "Achievements", href: "/about#achievements" },
    ],
  },
  {
    label: "Academics",
    href: "/courses",
    children: [
      { label: "Courses Offered", href: "/courses" },
      { label: "Syllabus", href: "/downloads#syllabus" },
      { label: "Programme Outcomes", href: "/courses#programme-outcomes" },
      { label: "Course Outcomes", href: "/courses#course-outcomes" },
      { label: "Time Tables", href: "/downloads#timetables" },
      { label: "Academic Calendar", href: "/downloads#calendar" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    label: "People",
    href: "/faculty",
    children: [
      { label: "Faculty", href: "/faculty" },
      { label: "Students", href: "/student-corner" },
      { label: "Alumni", href: "#" },
      { label: "Research Scholars / Project Students", href: "#" },
      { label: "Supporting Staff", href: "/faculty#staff" },
    ],
  },
  {
    label: "Research & Innovation",
    href: "#",
    children: [
      { label: "Publications", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Zoology Museum", href: "/facilities#museum" },
      { label: "Biodiversity Documentation", href: "#" },
      { label: "BSF & Vermicomposting", href: "/facilities#vermicomposting" },
      { label: "Fisheries & Aquaculture Lab", href: "/facilities#aquaculture" },
      { label: "Student Research", href: "#" },
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
      { label: "Gallery", href: "#" },
      { label: "Placements", href: "#" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
