import { prisma } from "@/lib/prisma";
import StatsBarClient from "./StatsBarClient";

export default async function StatsBar() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["STATS_STUDENTS", "STATS_FACULTY", "STATS_ALUMNI"],
      },
    },
  });

  const settingsMap = settings.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);

  // Also get live counts from the DB
  const [facultyCount, publicationCount] = await Promise.all([
    prisma.faculty.count({ where: { isActive: true } }),
    prisma.publication.count({ where: { isActive: true } }),
  ]);

  const stats = [
    {
      label: "Faculty Members",
      value: facultyCount || parseInt(settingsMap.STATS_FACULTY || "12"),
      icon: "Users",
    },
    {
      label: "Students Enrolled",
      value: parseInt(settingsMap.STATS_STUDENTS || "450"),
      suffix: "+",
      icon: "GraduationCap",
    },
    {
      label: "Research Publications",
      value: publicationCount || 85,
      icon: "BookOpen",
    },
    {
      label: "Alumni Network",
      value: parseInt(settingsMap.STATS_ALUMNI || "15"),
      icon: "Award",
    },
  ];

  return <StatsBarClient stats={stats} />;
}
