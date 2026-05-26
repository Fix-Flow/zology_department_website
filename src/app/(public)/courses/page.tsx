import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseCard from "@/components/courses/CourseCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Academic Programmes",
  description:
    "Explore Undergraduate, Postgraduate, and Skill Enhancement courses offered by the Department of Zoology.",
};

export default async function CoursesPage() {
  const dbCourses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  // Map DB shape to what CourseCard expects
  const mapCourse = (c: (typeof dbCourses)[number]) => ({
    slug: c.slug,
    title: c.title,
    level: c.level as "UG" | "PG" | "Skill",
    duration: c.duration,
    intake: c.intake,
    eligibility: c.eligibility,
    syllabusUrl: c.syllabusUrl || undefined,
    careerOpportunities: c.careerOpportunities,
    programmeOutcomes: c.programmeOutcomes,
    courseOutcomes: c.courseOutcomes,
    pso: c.pso,
  });

  const ugCourses = dbCourses.filter((c) => c.level === "UG").map(mapCourse);
  const pgCourses = dbCourses.filter((c) => c.level === "PG").map(mapCourse);
  const skillCourses = dbCourses.filter((c) => c.level === "SKILL").map(mapCourse);

  return (
    <>
      <PageHero
        title="Academic Programmes"
        subtitle="Comprehensive curricula designed to build strong foundations and advanced expertise in biological sciences"
      />

      <div className="section-container section-padding space-y-16">
        {/* Undergraduate */}
        {ugCourses.length > 0 && (
          <section>
            <SectionHeader
              title="Undergraduate Programmes"
              subtitle="Three-year degree courses offering foundational and applied knowledge."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ugCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Postgraduate */}
        {pgCourses.length > 0 && (
          <section>
            <SectionHeader
              title="Postgraduate Programme"
              subtitle="Advanced study and research-oriented master's degree."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pgCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Skill Courses */}
        {skillCourses.length > 0 && (
          <section id="skill-courses" className="scroll-mt-24">
            <SectionHeader
              title="Skill Enhancement Courses"
              subtitle="Short-term, employment-oriented courses to develop practical skills."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}

        {dbCourses.length === 0 && (
          <p className="text-center text-govt-muted py-12">
            No courses have been added yet. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}
