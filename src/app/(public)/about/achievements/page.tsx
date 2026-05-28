import { Award, Trophy, Star, Users, Microscope, BookOpen } from "lucide-react";


export const metadata = {
  title: "Achievements | About the Department",
};

export default function AchievementsPage() {
  const achievements = [
    { icon: <Award size={24} />, title: "NAAC 'A' Grade Accreditation", description: "College accredited with 'A' grade by National Assessment and Accreditation Council.", year: "2018", color: "bg-amber-50 text-amber-600" },
    { icon: <Trophy size={24} />, title: "Best Department Award", description: "Recognized as the Best Department in Science Faculty by the university for academic performance.", year: "2023", color: "bg-blue-50 text-blue-600" },
    { icon: <Star size={24} />, title: "85+ Research Publications", description: "Faculty and research scholars have published 85+ papers in national and international peer-reviewed journals.", year: "2024", color: "bg-green-50 text-green-600" },
    { icon: <Users size={24} />, title: "UGC NET Qualifiers", description: "12+ students qualified UGC NET/JRF in Life Sciences over the past 5 years.", year: "2024", color: "bg-purple-50 text-purple-600" },
    { icon: <Microscope size={24} />, title: "Innovation Hub Established", description: "Established BSF Waste Management Unit, Vermi Technology Unit, and IoT-based Aquaculture monitoring systems.", year: "2022", color: "bg-rose-50 text-rose-600" },
    { icon: <BookOpen size={24} />, title: "MoU with ICAR-CIFA", description: "Signed MoU with ICAR-CIFA, Bhubaneswar for collaborative research in sustainable aquaculture.", year: "2024", color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div data-component="Achievements_page">
      <h2 className="font-heading text-section-head text-govt-text mb-1">Achievements & Milestones</h2>
      <span className="gold-divider" />
      <p className="mt-4 text-govt-muted text-sm mb-8">
        Key achievements that reflect our commitment to excellence in teaching, research, and innovation.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <div key={i} className="card-static p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                {a.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-govt-muted uppercase tracking-wider">{a.year}</span>
                <h3 className="font-body font-semibold text-sm text-govt-text mt-0.5">{a.title}</h3>
                <p className="text-xs text-govt-muted leading-relaxed mt-1.5">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
