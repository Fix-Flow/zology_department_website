import PageHero from "@/components/ui/PageHero";

import { Microscope, Beaker, BookOpen, Monitor, Fish, ThermometerSun, Leaf, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure & Facilities",
  description:
    "Explore the modern laboratories, museum, and research facilities at the Department of Zoology, GDC Siddipet.",
};

const facilities = [
  {
    title: "UG & PG Laboratories",
    icon: <Beaker size={24} />,
    description: "Spacious, well-ventilated laboratories for B.Sc. and M.Sc. students equipped with modern instruments for practical sessions in anatomy, physiology, and biochemistry.",
    features: ["Digital pH meters", "Centrifuges", "Colorimeters", "Microtomes for histology"],
  },
  {
    title: "Zoology Museum",
    icon: <BookOpen size={24} />,
    description: "A rich collection of over 300 preserved specimens, rare osteological models, and articulated skeletons. It serves as a vital resource for taxonomic studies and comparative anatomy.",
    features: ["Invertebrate specimens", "Vertebrate specimens", "Human skeleton model", "Fossil replicas"],
  },
  {
    title: "Microscopy & Imaging Centre",
    icon: <Microscope size={24} />,
    description: "Dedicated facility for slide observation and cytological studies, equipped with advanced microscopy tools for research and regular practicals.",
    features: ["Trinocular microscopes with camera", "Phase contrast microscopes", "Dissecting microscopes", "Digital image projection"],
  },
  {
    title: "Vermi Technology Unit",
    icon: <Leaf size={24} />,
    description: "An eco-friendly initiative and skill-development unit where students learn solid waste management through vermicomposting using Eisenia fetida.",
    features: ["Vermicompost production", "Vermiwash collection", "Organic waste recycling", "Entrepreneurship training"],
  },
  {
    title: "BSF Waste Management Hub",
    icon: <ThermometerSun size={24} />,
    description: "Innovative facility utilizing Black Soldier Fly (Hermetia illucens) larvae to convert organic waste into high-protein feed for aquaculture and poultry.",
    features: ["BSF rearing cages", "Larval harvesting units", "Bioconversion tracking", "Sustainable feed production"],
  },
  {
    title: "Aquaculture & IoT Station",
    icon: <Fish size={24} />,
    description: "A modern facility for B.Sc. Fisheries students to study fish breeding, water quality management, and modern aquaculture techniques.",
    features: ["Glass aquariums", "Biofloc tanks", "IoT water quality sensors", "Aeration systems"],
  },
  {
    title: "Smart Classrooms",
    icon: <Monitor size={24} />,
    description: "ICT-enabled classrooms designed to provide an interactive learning experience using digital resources, presentations, and virtual dissections.",
    features: ["Interactive flat panels", "High-speed internet", "Virtual lab software", "Audio-visual aids"],
  },
  {
    title: "Departmental Library",
    icon: <Lightbulb size={24} />,
    description: "A specialized collection of reference books, journals, and project reports accessible to students for in-depth study and research preparation.",
    features: ["1000+ Reference books", "Previous thesis reports", "Competitive exam materials", "Reading space"],
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Infrastructure & Facilities"
        subtitle="State-of-the-art laboratories and innovative hubs fostering practical learning and research"
      />

      <div className="section-container section-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl text-govt-text font-bold mb-4">A Hub of Scientific Inquiry</h2>
          <p className="text-govt-muted leading-relaxed">
            The Department of Zoology takes pride in its excellent infrastructure designed to provide 
            hands-on training and research exposure. From traditional taxonomic museums to modern IoT-enabled 
            aquaculture systems, our facilities bridge the gap between theoretical knowledge and practical application.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facilities.map((facility, index) => (
            <div key={index} className="card-static flex flex-col h-full hover:-translate-y-1 hover:shadow-card transition-all duration-300">
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5">
                  {facility.icon}
                </div>
                
                <h3 className="font-heading font-bold text-xl text-govt-text mb-3">
                  {facility.title}
                </h3>
                
                <p className="text-sm text-govt-muted leading-relaxed mb-6 flex-1">
                  {facility.description}
                </p>

                <div className="bg-neutral-bg p-4 rounded-lg mt-auto">
                  <h4 className="text-xs font-bold text-govt-text uppercase tracking-wider mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {facility.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-govt-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
