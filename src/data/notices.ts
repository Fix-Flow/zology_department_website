import { Notice } from "@/types/notice";

export const notices: Notice[] = [
  {
    id: "notice-001",
    title: "M.Sc. Zoology Admission 2024-25 — Applications Open",
    date: "2024-11-01",
    category: "admission",
    attachmentUrl: "/docs/forms/msc-admission-form-2024.pdf",
    isNew: true,
  },
  {
    id: "notice-002",
    title: "Revised Semester Exam Timetable — Nov 2024",
    date: "2024-10-25",
    category: "exam",
    attachmentUrl: "/docs/timetables/exam-timetable-nov-2024.pdf",
    isNew: true,
  },
  {
    id: "notice-003",
    title: "National Workshop on BSF Technology — Registration Open",
    date: "2024-10-20",
    category: "seminar",
    attachmentUrl: "/docs/events/bsf-workshop-brochure.pdf",
    isNew: true,
  },
  {
    id: "notice-004",
    title: "B.Sc. III Year Internal Assessment Marks Published",
    date: "2024-10-15",
    category: "result",
    isNew: false,
  },
  {
    id: "notice-005",
    title: "Circular: Mandatory Attendance for Lab Sessions",
    date: "2024-10-10",
    category: "circular",
    attachmentUrl: "/docs/circulars/attendance-circular-oct-2024.pdf",
    isNew: false,
  },
  {
    id: "notice-006",
    title: "Scholarship Applications — SC/ST/OBC/EBC Students",
    date: "2024-09-28",
    category: "general",
    attachmentUrl: "/docs/forms/scholarship-application-2024.pdf",
    isNew: false,
  },
  {
    id: "notice-007",
    title: "Guest Lecture on Wildlife Conservation — 20th September",
    date: "2024-09-15",
    category: "seminar",
    isNew: false,
  },
  {
    id: "notice-008",
    title: "B.Sc. I Year Orientation Programme — 5th August",
    date: "2024-07-30",
    category: "general",
    isNew: false,
  },
  {
    id: "notice-009",
    title: "UGC NET Coaching Classes — Free for PG Students",
    date: "2024-07-15",
    category: "general",
    isNew: false,
  },
  {
    id: "notice-010",
    title: "Summer Internship Opportunities — Apply Before 30th June",
    date: "2024-06-10",
    category: "general",
    attachmentUrl: "/docs/forms/internship-notice-2024.pdf",
    isNew: false,
  },
];

export function getNewNotices(): Notice[] {
  return notices.filter((n) => n.isNew);
}

export function getNoticesByCategory(category: Notice["category"]): Notice[] {
  return notices.filter((n) => n.category === category);
}

export function getRecentNotices(count: number = 5): Notice[] {
  return [...notices]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
