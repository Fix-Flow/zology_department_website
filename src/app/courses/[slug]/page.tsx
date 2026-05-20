import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Users, GraduationCap, Download, CheckCircle2, Briefcase } from "lucide-react";
import { courses, getCourseBySlug } from "@/data/courses";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return courses.map((c) => ({
    slug: c.slug,
  }));
}

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: `Details, outcomes, and career opportunities for ${course.title} at GDC Siddipet.`,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="section-container section-padding">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to Courses
      </Link>

      {/* Header Section */}
      <div className="bg-primary text-white rounded-xl p-8 sm:p-10 mb-10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-bold rounded-full mb-4">
            {course.level === "UG" && "Undergraduate"}
            {course.level === "PG" && "Postgraduate"}
            {course.level === "Skill" && "Skill Enhancement"}
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
            {course.title}
          </h1>

          <div className="flex flex-wrap gap-6 sm:gap-10 text-white/80">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-accent" />
              <span className="font-medium">{course.duration}</span>
            </div>
            {course.intake && (
              <div className="flex items-center gap-2">
                <Users size={20} className="text-accent" />
                <span className="font-medium">Intake: {course.intake}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <GraduationCap size={20} className="text-accent" />
              <span className="font-medium">Eligibility: {course.eligibility}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* Main Content */}
        <div className="space-y-10">
          
          {/* Programme Outcomes */}
          {course.programmeOutcomes && (
            <section>
              <h2 className="font-heading text-2xl text-govt-text mb-4">Programme Outcomes</h2>
              <ul className="space-y-3">
                {course.programmeOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex gap-3 items-start p-4 bg-neutral-bg rounded-lg">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-govt-text leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Programme Specific Outcomes */}
          {course.pso && (
            <section>
              <h2 className="font-heading text-2xl text-govt-text mb-4">Programme Specific Outcomes</h2>
              <ul className="space-y-3">
                {course.pso.map((outcome, idx) => (
                  <li key={idx} className="flex gap-3 items-start p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-govt-text leading-relaxed font-medium">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Course Outcomes */}
          {course.courseOutcomes && (
            <section>
              <h2 className="font-heading text-2xl text-govt-text mb-4">Key Course Outcomes</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {course.courseOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-sm text-govt-muted leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="card-static p-6 border-t-4 border-t-accent">
            <h3 className="font-heading font-bold text-lg mb-4">Course Actions</h3>
            
            <div className="space-y-3">
              {course.syllabusUrl && (
                <a href={course.syllabusUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center">
                  <Download size={16} />
                  Download Syllabus
                </a>
              )}
              <Link href="/admissions" className="btn-primary w-full justify-center">
                Apply for Admission
              </Link>
            </div>
          </div>

          {/* Career Opportunities */}
          {course.careerOpportunities && (
            <div className="card-static p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={20} className="text-primary" />
                <h3 className="font-heading font-bold text-lg">Career Opportunities</h3>
              </div>
              <ul className="space-y-3">
                {course.careerOpportunities.map((career, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-sm text-govt-muted">
                    <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    {career}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
