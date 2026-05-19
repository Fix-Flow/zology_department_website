import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function HodMessage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <SectionHeader
          title="From the Head of Department"
          subtitle="A message of welcome and vision from the HoD"
        />

        <div className="grid gap-8 md:grid-cols-[280px_1fr] items-start">
          {/* HoD Photo */}
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-neutral-bg border-2 border-govt-border shadow-card">
              {/* Placeholder avatar */}
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-5xl font-heading font-bold text-primary/30">KR</span>
              </div>
            </div>
            <h3 className="mt-4 font-heading font-bold text-base text-govt-text">
              Dr. K. Ramesh Kumar
            </h3>
            <p className="text-sm text-govt-muted">M.Sc., Ph.D., NET</p>
            <p className="text-sm text-accent font-semibold mt-0.5">
              Head of Department
            </p>
          </div>

          {/* Message */}
          <div className="relative">
            <Quote size={40} className="text-accent/20 absolute -top-2 -left-2" />

            <div className="pl-6 sm:pl-8">
              <p className="text-govt-text leading-relaxed text-[15px] mb-4">
                It gives me immense pleasure to welcome you to the Department of Zoology at
                Government Degree College (Autonomous), Siddipet. Since our establishment in
                1985, we have been committed to providing quality education in biological
                sciences and nurturing students who can contribute meaningfully to society.
              </p>
              <p className="text-govt-text leading-relaxed text-[15px] mb-4">
                Our department offers a dynamic learning environment with well-equipped
                laboratories, a rich zoological museum, and innovative facilities like our
                Vermi Technology Unit and BSF Waste Management Unit. We take pride in our
                dedicated faculty, who bring both academic rigor and practical expertise to
                the classroom.
              </p>
              <p className="text-govt-text leading-relaxed text-[15px] mb-6">
                I encourage all students to make the most of the opportunities available —
                engage in research, participate in workshops, and develop the skills needed
                for a successful career in the biological sciences. Together, let us continue
                our tradition of academic excellence and scientific innovation.
              </p>

              {/* Signature */}
              <div className="border-t border-govt-border pt-4">
                <p className="font-heading font-bold text-primary text-sm">
                  Dr. K. Ramesh Kumar
                </p>
                <p className="text-xs text-govt-muted">
                  Associate Professor & Head, Department of Zoology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
