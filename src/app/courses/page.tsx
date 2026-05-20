import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseCard from "@/components/courses/CourseCard";
import { getCoursesByLevel } from "@/data/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Programmes",
  description:
    "Explore Undergraduate, Postgraduate, and Skill Enhancement courses offered by the Department of Zoology.",
};

export default function CoursesPage() {
  const ugCourses = getCoursesByLevel("UG");
  const pgCourses = getCoursesByLevel("PG");
  const skillCourses = getCoursesByLevel("Skill");

  return (
    <>
      <PageHero
        title="Academic Programmes"
        subtitle="Comprehensive curricula designed to build strong foundations and advanced expertise in biological sciences"
      />

      <div className="section-container section-padding space-y-16">
        {/* Undergraduate */}
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

        {/* Postgraduate */}
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

        {/* Skill Courses */}
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
      </div>
    </>
  );
}
