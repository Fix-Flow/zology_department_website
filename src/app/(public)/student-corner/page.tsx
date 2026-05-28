import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { BookOpen, Trophy, GraduationCap, Download, Users, Lightbulb } from "lucide-react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Student Corner",
  description: "Resources, clubs, achievements, and academic materials for students of the Zoology Department.",
};

export default function StudentCornerPage() {
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
            {[
              { title: "UG Syllabus (CBCS)", icon: <BookOpen size={20} />, link: "/docs/syllabus-ug.pdf" },
              { title: "PG Syllabus (CBCS)", icon: <BookOpen size={20} />, link: "/docs/syllabus-pg.pdf" },
              { title: "Academic Calendar", icon: <Download size={20} />, link: "/docs/calendar-2024.pdf" },
              { title: "Previous Question Papers", icon: <FileText size={20} />, link: "/docs/qp-bank.pdf" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="card-static p-5 flex flex-col items-center text-center group hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-body font-semibold text-sm text-govt-text group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </a>
            ))}
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
              <div className="card-static p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <Leaf size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-govt-text">Eco Club</h3>
                </div>
                <p className="text-sm text-govt-muted leading-relaxed">
                  The Eco Club organizes tree plantation drives, plastic-free campus campaigns, and awareness rallies on environmental conservation. Students actively participate in maintaining the departmental vermicompost unit.
                </p>
              </div>

              <div className="card-static p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Lightbulb size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-govt-text">Science Forum (JIGNASA)</h3>
                </div>
                <p className="text-sm text-govt-muted leading-relaxed">
                  Under the JIGNASA program, students engage in student study projects, present papers at state-level competitions, and organize science exhibitions to foster scientific temper.
                </p>
              </div>
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
                {[
                  { name: "K. Sowmya (M.Sc.)", achievement: "Qualified CSIR-UGC NET (JRF) in Life Sciences, 2024", icon: <Trophy size={16} /> },
                  { name: "B.Sc. III Year Team", achievement: "1st Prize in State Level JIGNASA Student Study Project, 2023", icon: <Award size={16} /> },
                  { name: "M. Rahul (B.Sc.)", achievement: "Selected for Summer Research Fellowship by IASc-INSA-NASI", icon: <GraduationCap size={16} /> },
                  { name: "P. Anjali (M.Sc.)", achievement: "Secured University 2nd Rank in OU PG Examinations", icon: <Star size={16} /> },
                  { name: "Eco Club Volunteers", achievement: "Best NSS Volunteers Award at District Level", icon: <Users size={16} /> },
                ].map((item, i) => (
                  <li key={i} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-neutral-bg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-sm text-govt-text">{item.name}</h4>
                      <p className="text-xs text-govt-muted mt-1">{item.achievement}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Quick mock of icons not imported from lucide-react above
function FileText({ size, className }: { size?: number; className?: string }) {
  return <svg data-component="Student-corner_page" xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
}

function Leaf({ size, className }: { size?: number; className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
}

function Award({ size, className }: { size?: number; className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
}

function Star({ size, className }: { size?: number; className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
