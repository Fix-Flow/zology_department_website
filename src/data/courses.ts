import { Course } from "@/types/course";

export const courses: Course[] = [
  // ─── Undergraduate Programmes ───
  {
    slug: "bsc-zoology",
    title: "B.Sc. Zoology",
    level: "UG",
    duration: "3 Years (6 Semesters)",
    intake: 60,
    eligibility:
      "Intermediate (10+2) with Biology/Life Sciences from a recognized board with minimum 45% marks (40% for reserved categories).",
    syllabusUrl: "/docs/syllabus/bsc-zoology-syllabus.pdf",
    careerOpportunities: [
      "Higher studies (M.Sc., Ph.D.)",
      "UPSC/TSPSC Civil Services",
      "Wildlife Conservation Officer",
      "Research Associate in Biological Sciences",
      "Lab Technician in Hospitals & Diagnostics",
      "Fisheries & Aquaculture Officer",
      "Environmental Consultant",
      "Teaching (after B.Ed.)",
    ],
    programmeOutcomes: [
      "Apply fundamental principles of Zoology to understand animal diversity and classification.",
      "Demonstrate practical skills in laboratory techniques including dissection, slide preparation, and microscopy.",
      "Analyze and interpret biological data using scientific methods.",
      "Communicate scientific findings effectively through reports and presentations.",
      "Appreciate biodiversity and advocate for conservation and sustainability.",
    ],
    courseOutcomes: [
      "Identify and classify animals up to the order level using taxonomic keys.",
      "Understand the principles of genetics, evolution, and molecular biology.",
      "Perform standard laboratory experiments in physiology and biochemistry.",
      "Explain the economic importance of insects, fish, and other animals.",
    ],
    pso: [
      "Demonstrate comprehensive knowledge of animal diversity from Protozoa to Mammalia.",
      "Apply concepts of ecology, genetics, and evolution to real-world scenarios.",
      "Develop skills for competitive examinations and research aptitude.",
    ],
  },
  {
    slug: "bsc-fisheries-aquaculture",
    title: "B.Sc. Fisheries & Aquaculture",
    level: "UG",
    duration: "3 Years (6 Semesters)",
    intake: 40,
    eligibility:
      "Intermediate (10+2) with Biology/Life Sciences with minimum 45% marks.",
    syllabusUrl: "/docs/syllabus/bsc-fisheries-syllabus.pdf",
    careerOpportunities: [
      "Fisheries Development Officer",
      "Aquaculture Farm Manager",
      "Fish Processing Technologist",
      "State Fisheries Department posts",
      "ICAR-CIFE/CIFA/CIFRI Research positions",
      "Shrimp Hatchery Manager",
      "Aquatic Health Inspector",
      "Fish Feed Industry",
    ],
    programmeOutcomes: [
      "Understand the biology and culture techniques of commercially important fish and shellfish species.",
      "Apply modern aquaculture techniques for sustainable fish production.",
      "Manage fish farms, hatcheries, and post-harvest processing units.",
      "Evaluate water quality parameters critical for aquaculture operations.",
    ],
    courseOutcomes: [
      "Identify major freshwater and marine fish species of India.",
      "Design and manage aquaculture pond systems.",
      "Apply principles of fish nutrition, breeding, and health management.",
      "Understand fish processing, preservation, and quality control methods.",
    ],
    pso: [
      "Integrate theoretical knowledge with practical field skills in fisheries and aquaculture.",
      "Develop entrepreneurship abilities in aquaculture and allied sectors.",
      "Apply sustainable practices in fisheries resource management.",
    ],
  },

  // ─── Postgraduate Programmes ───
  {
    slug: "msc-zoology",
    title: "M.Sc. Zoology",
    level: "PG",
    duration: "2 Years (4 Semesters)",
    intake: 30,
    eligibility:
      "B.Sc. with Zoology as one of the subjects from a recognized university with minimum 50% marks (45% for reserved categories).",
    syllabusUrl: "/docs/syllabus/msc-zoology-syllabus.pdf",
    careerOpportunities: [
      "Doctoral Research (Ph.D.)",
      "NET/SET/GATE qualified Lecturer",
      "Scientist in CSIR/ICAR/DBT labs",
      "Wildlife Biologist with Forest Department",
      "Drug Testing Lab Analyst",
      "Forensic Biologist",
      "Biotechnology Industry",
      "Environmental Impact Assessor",
      "Museum Curator (Natural History)",
    ],
    programmeOutcomes: [
      "Conduct independent research in specialized areas of Zoology.",
      "Apply advanced techniques in molecular biology, biotechnology, and bioinformatics.",
      "Critically analyze published research and contribute to scientific literature.",
      "Demonstrate expertise in specialized fields of Zoology.",
      "Design and execute research projects with ethical standards.",
    ],
    courseOutcomes: [
      "Master advanced concepts in animal systematics, physiology, and ecology.",
      "Apply molecular and genomic techniques in biological research.",
      "Demonstrate proficiency in biostatistics and research methodology.",
      "Prepare and defend a dissertation based on original research.",
    ],
    pso: [
      "Develop expertise in chosen specialization areas such as entomology, parasitology, or fisheries.",
      "Qualify national-level competitive examinations (NET, SET, GATE).",
      "Contribute to research publications in peer-reviewed journals.",
    ],
  },

  // ─── Skill Enhancement Courses ───
  {
    slug: "sec-aquarium-fish-keeping",
    title: "SEC: Aquarium Fish Keeping",
    level: "Skill",
    duration: "1 Semester",
    intake: 30,
    eligibility: "Open to all undergraduate students.",
    careerOpportunities: [
      "Ornamental fish breeder",
      "Aquarium setup & maintenance business",
      "Pet store management",
      "Export of ornamental fish",
    ],
    programmeOutcomes: [
      "Set up and maintain freshwater and marine aquariums.",
      "Identify and breed ornamental fish species.",
    ],
    courseOutcomes: [
      "Design aquarium systems with appropriate filtration and aeration.",
      "Manage water quality parameters for ornamental fish health.",
      "Understand the market chain of ornamental fisheries.",
    ],
    pso: [
      "Develop practical skills for self-employment in ornamental fisheries.",
    ],
  },
  {
    slug: "mdc-vermicomposting",
    title: "MDC: Vermicomposting Technology",
    level: "Skill",
    duration: "1 Semester",
    intake: 30,
    eligibility: "Open to all undergraduate students.",
    careerOpportunities: [
      "Vermicomposting unit entrepreneur",
      "Organic farming consultant",
      "Waste management specialist",
      "NGO project coordinator (sustainable agriculture)",
    ],
    programmeOutcomes: [
      "Set up and manage a vermicomposting unit.",
      "Produce and market vermicompost and vermiwash commercially.",
    ],
    courseOutcomes: [
      "Identify suitable earthworm species for composting.",
      "Prepare vermi-beds and manage vermicomposting operations.",
      "Test and certify vermicompost quality standards.",
    ],
    pso: [
      "Apply waste-to-wealth concepts through vermitechnology for rural livelihood.",
    ],
  },
  {
    slug: "dse-applied-entomology",
    title: "DSE: Applied Entomology",
    level: "Skill",
    duration: "1 Semester",
    intake: 30,
    eligibility: "B.Sc. students with Zoology background.",
    careerOpportunities: [
      "Pest management consultant",
      "Sericulture officer",
      "Agricultural entomologist",
      "Apiculture entrepreneur",
    ],
    programmeOutcomes: [
      "Apply entomological knowledge in pest management and beneficial insect utilization.",
      "Understand the economic importance of insects in agriculture and industry.",
    ],
    courseOutcomes: [
      "Identify major crop pests and their natural enemies.",
      "Design integrated pest management strategies.",
      "Understand principles of sericulture and apiculture.",
    ],
    pso: [
      "Develop applied skills in insect pest management and beneficial insect rearing.",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByLevel(level: Course["level"]): Course[] {
  return courses.filter((c) => c.level === level);
}
