import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { BookOpen, Trophy, GraduationCap, Download, Users, Lightbulb, Leaf, Award, Star, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Corner",
  description: "Resources, clubs, achievements, and academic materials for students of the Zoology Department.",
};

// Map strings from DB to Lucide components
const IconMap: Record<string, React.ElementType> = {
  BookOpen, Trophy, GraduationCap, Download, Users, Lightbulb, Leaf, Award, Star, FileText
};

export default async function StudentCornerPage() {
  const featuredDownloads = await prisma.download.findMany({
    where: { isActive: true, isFeatured: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const clubs = await prisma.studentClub.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  const achievements = await prisma.studentAchievement.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHero
        title="Student Corner"
        subtitle="Your central hub for academic resources, clubs, and student activities"
      />

      <div className="section-container section-padding space-y-16">
        
        {/* Quick Resources */}
        <section>
          <SectionHeader
            title="Academic Resources"
            subtitle="Essential materials and links for your daily academic needs."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDownloads.length > 0 ? (
              featuredDownloads.map((item) => {
                let icon = <FileText size={20} />;
                if (item.category === "SYLLABUS") icon = <BookOpen size={20} />;
                else if (item.category === "ACADEMIC_CALENDAR" || item.category === "TIMETABLE") icon = <Download size={20} />;

                return (
                  <a
                    key={item.id}
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-static p-5 flex flex-col items-center text-center group hover:border-primary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <span className="font-body font-semibold text-sm text-govt-text group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                  </a>
                );
              })
            ) : (
              <p className="text-sm text-govt-muted col-span-full py-4 text-center">
                No featured resources available at the moment.
              </p>
            )}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Student Clubs */}
          <section className="space-y-6">
            <SectionHeader
              title="Student Clubs & Forums"
              subtitle="Beyond the classroom learning"
            />
            <div className="space-y-4">
              {clubs.map(club => {
                const IconComp = IconMap[club.icon] || Lightbulb;
                return (
                  <div key={club.id} className="card-static p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <IconComp size={20} />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-govt-text">{club.name}</h3>
                    </div>
                    <p className="text-sm text-govt-muted leading-relaxed">
                      {club.description}
                    </p>
                  </div>
                );
              })}
              {clubs.length === 0 && (
                <p className="text-sm text-govt-muted py-4">No clubs found.</p>
              )}
            </div>
          </section>

          {/* Student Achievements */}
          <section className="space-y-6">
            <SectionHeader
              title="Recent Achievements"
              subtitle="Celebrating our students' success"
            />
            <div className="card-static p-0 overflow-hidden">
              <ul className="divide-y divide-govt-border">
                {achievements.map((ach) => {
                  const IconComp = IconMap[ach.icon] || Trophy;
                  return (
                    <li key={ach.id} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-neutral-bg transition-colors">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <IconComp size={16} />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-sm text-govt-text">
                          {ach.studentName} {ach.year && <span className="text-govt-muted text-xs font-normal ml-1">({ach.year})</span>}
                        </h4>
                        <p className="text-xs text-govt-muted mt-1">{ach.achievement}</p>
                      </div>
                    </li>
                  );
                })}
                {achievements.length === 0 && (
                  <li className="p-5 text-center text-sm text-govt-muted">No achievements recorded yet.</li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Removed manual mock SVG functions since we imported them directly from lucide-react
