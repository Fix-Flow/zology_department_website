import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zoology.gdcsiddipet.ac.in";

  // Fetch dynamic slugs
  const [faculty, courses, events] = await Promise.all([
    prisma.faculty.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.course.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.event.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const facultyUrls = faculty.map((f) => ({
    url: `${baseUrl}/faculty/${f.slug}`,
    lastModified: f.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const courseUrls = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const eventUrls = events.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: e.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    "",
    "/about",
    "/faculty",
    "/courses",
    "/events",
    "/facilities",
    "/downloads",
    "/student-corner",
    "/admissions",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...staticRoutes, ...facultyUrls, ...courseUrls, ...eventUrls];
}
