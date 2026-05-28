import { CheckCircle2 } from "lucide-react";


export const metadata = {
  title: "Objectives | About the Department",
};

export default function ObjectivesPage() {
  const objectives = [
    "Impart quality education in Zoology at UG and PG levels following the Choice Based Credit System (CBCS) and NEP 2020 framework.",
    "Equip students with practical laboratory skills, field experience, and research methodology in biological sciences.",
    "Foster research and innovation through student projects, faculty research, and collaboration with ICAR, CSIR, and UGC-sponsored programmes.",
    "Develop employable skills through Skill Enhancement Courses (SEC) in aquarium fish keeping, vermicomposting, and applied entomology.",
    "Promote biodiversity conservation awareness through museum exhibitions, field visits, and community engagement programmes.",
    "Prepare students for competitive examinations including UGC NET, GATE, TSPSC, and UPSC through coaching and mentorship.",
    "Establish industry-academia linkages for internships, placements, and entrepreneurship opportunities in aquaculture, fisheries, and environmental sectors.",
    "Integrate ICT tools, smart classrooms, and digital learning resources for effective teaching-learning processes.",
  ];

  return (
    <div data-component="Objectives_page" className="max-w-3xl">
      <h2 className="font-heading text-section-head text-govt-text mb-1">Department Objectives</h2>
      <span className="gold-divider" />
      <p className="mt-4 text-govt-muted text-sm mb-8">
        Our strategic objectives guide every aspect of departmental activities, from curriculum design to community engagement.
      </p>

      <div className="space-y-4">
        {objectives.map((obj, i) => (
          <div key={i} className="flex gap-3.5 items-start">
            <div className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={15} className="text-primary" />
            </div>
            <p className="text-govt-text text-[15px] leading-relaxed">{obj}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
