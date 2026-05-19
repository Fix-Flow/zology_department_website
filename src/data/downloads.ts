export interface DownloadItem {
  id: string;
  title: string;
  category: "syllabus" | "circular" | "timetable" | "form" | "lab-manual" | "project-format" | "event-report" | "brochure";
  fileUrl: string;
  fileSize: string;
  dateUploaded: string;
}

export const downloads: DownloadItem[] = [
  {
    id: "dl-001",
    title: "B.Sc. Zoology Syllabus (CBCS) 2024-25",
    category: "syllabus",
    fileUrl: "/docs/syllabus/bsc-zoology-syllabus.pdf",
    fileSize: "2.4 MB",
    dateUploaded: "2024-06-15",
  },
  {
    id: "dl-002",
    title: "M.Sc. Zoology Syllabus 2024-25",
    category: "syllabus",
    fileUrl: "/docs/syllabus/msc-zoology-syllabus.pdf",
    fileSize: "3.1 MB",
    dateUploaded: "2024-06-15",
  },
  {
    id: "dl-003",
    title: "B.Sc. Fisheries & Aquaculture Syllabus",
    category: "syllabus",
    fileUrl: "/docs/syllabus/bsc-fisheries-syllabus.pdf",
    fileSize: "1.8 MB",
    dateUploaded: "2024-06-15",
  },
  {
    id: "dl-004",
    title: "Semester Exam Timetable — Nov 2024",
    category: "timetable",
    fileUrl: "/docs/timetables/exam-timetable-nov-2024.pdf",
    fileSize: "450 KB",
    dateUploaded: "2024-10-25",
  },
  {
    id: "dl-005",
    title: "Class Timetable — Odd Semester 2024-25",
    category: "timetable",
    fileUrl: "/docs/timetables/class-timetable-odd-2024.pdf",
    fileSize: "320 KB",
    dateUploaded: "2024-07-01",
  },
  {
    id: "dl-006",
    title: "Zoology Lab Manual — B.Sc. II Year",
    category: "lab-manual",
    fileUrl: "/docs/lab-manuals/zoology-lab-manual-bsc2.pdf",
    fileSize: "5.2 MB",
    dateUploaded: "2024-06-20",
  },
  {
    id: "dl-007",
    title: "Fisheries Lab Manual — Practicals",
    category: "lab-manual",
    fileUrl: "/docs/lab-manuals/fisheries-lab-manual.pdf",
    fileSize: "4.7 MB",
    dateUploaded: "2024-06-20",
  },
  {
    id: "dl-008",
    title: "M.Sc. Admission Application Form 2024-25",
    category: "form",
    fileUrl: "/docs/forms/msc-admission-form-2024.pdf",
    fileSize: "180 KB",
    dateUploaded: "2024-11-01",
  },
  {
    id: "dl-009",
    title: "Scholarship Application Form — SC/ST/OBC",
    category: "form",
    fileUrl: "/docs/forms/scholarship-application-2024.pdf",
    fileSize: "220 KB",
    dateUploaded: "2024-09-28",
  },
  {
    id: "dl-010",
    title: "M.Sc. Project/Dissertation Format & Guidelines",
    category: "project-format",
    fileUrl: "/docs/forms/msc-project-format.pdf",
    fileSize: "350 KB",
    dateUploaded: "2024-07-15",
  },
  {
    id: "dl-011",
    title: "BSF Workshop Report — Nov 2024",
    category: "event-report",
    fileUrl: "/docs/events/bsf-workshop-report.pdf",
    fileSize: "6.1 MB",
    dateUploaded: "2024-11-20",
  },
  {
    id: "dl-012",
    title: "Department Brochure 2024-25",
    category: "brochure",
    fileUrl: "/docs/department-brochure-2024.pdf",
    fileSize: "8.5 MB",
    dateUploaded: "2024-06-01",
  },
  {
    id: "dl-013",
    title: "Attendance Circular — October 2024",
    category: "circular",
    fileUrl: "/docs/circulars/attendance-circular-oct-2024.pdf",
    fileSize: "120 KB",
    dateUploaded: "2024-10-10",
  },
];

export function getDownloadsByCategory(category: DownloadItem["category"]): DownloadItem[] {
  return downloads.filter((d) => d.category === category);
}
