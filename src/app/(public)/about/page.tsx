import { ESTABLISHED_YEAR, COLLEGE_NAME } from "@/lib/constants";


export const metadata = {
  title: "History | About the Department",
};

export default function HistoryPage() {
  const milestones = [
    { year: ESTABLISHED_YEAR, title: "Department Established", description: "The Department of Zoology was established as part of Government Degree College, Siddipet, offering B.Sc. programme with Zoology as a subject." },
    { year: 1995, title: "Laboratory Expansion", description: "State-of-the-art Zoology laboratory set up with modern equipment for practical training and research." },
    { year: 2005, title: "PG Programme Introduced", description: "M.Sc. Zoology programme launched to provide advanced education and research opportunities in biological sciences." },
    { year: 2010, title: "Zoological Museum Established", description: "A comprehensive zoological museum was established with 300+ specimens covering invertebrates and vertebrates." },
    { year: 2015, title: "College Granted Autonomy", description: "GDC Siddipet received autonomous status, enabling the department to design its own curriculum and conduct examinations." },
    { year: 2018, title: "NAAC Accreditation", description: "The college received NAAC accreditation with 'A' grade, recognizing quality standards in education and infrastructure." },
    { year: 2020, title: "Fisheries & Aquaculture Programme", description: "B.Sc. Fisheries & Aquaculture programme introduced, expanding career opportunities for students in aquatic sciences." },
    { year: 2022, title: "Innovation Hub Launch", description: "Vermi Technology Unit, BSF Waste Management Unit, and IoT-based aquaculture monitoring systems established." },
    { year: 2024, title: "National Workshop on BSF Technology", description: "Successfully organized a national-level workshop attracting participants from 15+ institutions across India." },
  ];

  return (
    <div data-component="About_page">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center">
          <span className="font-heading font-bold text-3xl text-primary">{ESTABLISHED_YEAR}</span>
        </div>
        <div>
          <h2 className="font-heading text-section-head text-govt-text">Our Journey</h2>
          <p className="text-govt-muted text-sm mt-1">
            {new Date().getFullYear() - ESTABLISHED_YEAR} years of academic excellence in Zoology
          </p>
        </div>
      </div>

      <p className="text-govt-text leading-relaxed mb-8 max-w-3xl">
        The Department of Zoology at {COLLEGE_NAME} has been a beacon of biological sciences
        education since {ESTABLISHED_YEAR}. Over the decades, the department has grown from a
        single undergraduate programme to a comprehensive centre offering UG, PG, and skill
        enhancement courses, equipped with modern laboratories, a zoological museum, and
        innovative research facilities.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-govt-border sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative flex items-start gap-6 sm:gap-0 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[12px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-white shadow-sm z-10 sm:left-1/2 sm:-translate-x-1/2" />

              {/* Content */}
              <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-32px)] ${index % 2 === 0 ? "sm:pr-4 sm:text-right" : "sm:pl-4"}`}>
                <span className="inline-block px-2.5 py-0.5 bg-accent/10 text-accent-dark text-xs font-bold rounded-full mb-1.5">
                  {milestone.year}
                </span>
                <h3 className="font-body font-semibold text-base text-govt-text">{milestone.title}</h3>
                <p className="text-sm text-govt-muted leading-relaxed mt-1">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
