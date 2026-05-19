export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string; // Lucide icon name
}

export const departmentStats: StatItem[] = [
  { label: "Faculty Members", value: 12, icon: "Users" },
  { label: "Students Enrolled", value: 450, suffix: "+", icon: "GraduationCap" },
  { label: "Research Publications", value: 85, icon: "BookOpen" },
  { label: "Awards & Recognitions", value: 15, icon: "Award" },
];

export const extendedStats: StatItem[] = [
  ...departmentStats,
  { label: "Laboratories", value: 7, icon: "FlaskConical" },
  { label: "Courses Offered", value: 6, icon: "Library" },
  { label: "Years of Excellence", value: new Date().getFullYear() - 1985, icon: "Calendar" },
  { label: "Events Conducted", value: 40, suffix: "+", icon: "CalendarCheck" },
];
