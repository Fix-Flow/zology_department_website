import { BookOpen, Microscope, Users, Star } from "lucide-react";


export const metadata = {
  title: "Vision & Mission | About the Department",
};

export default function VisionMissionPage() {
  return (
    <div data-component="Vision_page" className="space-y-10 max-w-4xl">
      {/* Vision */}
      <div>
        <h2 className="font-heading text-section-head text-govt-text mb-1">Vision</h2>
        <span className="gold-divider" />
        <blockquote className="blockquote-styled mt-6">
          To be a centre of excellence in Zoological sciences, fostering innovative research,
          quality education, and societal engagement, thereby contributing to biodiversity
          conservation, sustainable development, and holistic growth of students.
        </blockquote>
      </div>

      {/* Mission */}
      <div>
        <h2 className="font-heading text-section-head text-govt-text mb-1">Mission</h2>
        <span className="gold-divider" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { icon: <BookOpen size={20} />, text: "Provide comprehensive and quality education in Zoological sciences with emphasis on practical knowledge and employable skills." },
            { icon: <Microscope size={20} />, text: "Promote research culture among students and faculty through innovative projects, publications, and collaborations with national institutions." },
            { icon: <Users size={20} />, text: "Develop scientific temper, critical thinking, and ethical values in students to become responsible citizens and lifelong learners." },
            { icon: <Star size={20} />, text: "Engage with the community through extension activities, awareness programmes, and sustainable technology transfer in vermiculture and aquaculture." },
          ].map((item, i) => (
            <div key={i} className="card-static p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                {item.icon}
              </div>
              <p className="text-sm text-govt-text leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
