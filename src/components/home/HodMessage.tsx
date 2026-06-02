import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";


export default function HodMessage() {
  return (
    <section data-component="HodMessage" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/[0.02] -translate-y-1/2 translate-x-1/2" />

      <div className="section-container relative">
        <SectionHeader
          title="Leadership Messages"
          subtitle="Guiding vision for our department and institution"
        />

        <div className="flex flex-col gap-10">
          {/* Principal Message Card */}
          <div className="card-static p-6 sm:p-8 lg:p-10 border-l-4 border-l-accent">
            <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] items-start">
              {/* Principal Photo */}
              <div className="flex flex-col items-center text-center">
                <div className="w-52 h-52 rounded-xl overflow-hidden bg-neutral-bg border-2 border-govt-border shadow-md ring-4 ring-primary/5">
                  <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                    <span className="text-5xl font-heading font-bold text-primary/25">CP</span>
                  </div>
                </div>
                <h3 className="mt-5 font-heading font-bold text-base text-govt-text">
                  Dr. Ch. Prasad
                </h3>
                <p className="text-sm text-govt-muted mt-0.5">Principal</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-accent/10 rounded-full">
                  <p className="text-xs text-accent-dark font-semibold">
                    Head of Institution
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <Quote size={48} className="text-accent/15 absolute -top-3 -left-1" />

                <div className="pl-12 sm:pl-14 md:pl-16">
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-5">
                    Welcome to Government Degree College (Autonomous), Siddipet. Our institution is dedicated to fostering academic excellence, holistic development, and a strong sense of social responsibility among our students.
                  </p>
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-5">
                    The Department of Zoology, with its rich legacy since 1985, stands as a pillar of scientific temper and innovation within our college. With state-of-the-art facilities and a dedicated faculty, the department continues to set high standards in biological sciences education.
                  </p>
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-8">
                    I commend the department's continuous pursuit of knowledge and research, and I wish all the students a successful and transformative academic journey.
                  </p>

                  {/* Signature */}
                  <div className="border-t border-govt-border pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-0.5 bg-accent rounded-full" />
                      <div>
                        <p className="font-heading font-bold text-primary text-sm">
                          Dr. Ch. Prasad
                        </p>
                        <p className="text-xs text-govt-muted mt-0.5">
                          Principal, GDC (Autonomous) Siddipet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HoD Message Card */}
          <div className="card-static p-6 sm:p-8 lg:p-10 border-l-4 border-l-accent">
            <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] items-start">
              {/* HoD Photo — formal treatment */}
              <div className="flex flex-col items-center text-center">
                <div className="w-52 h-52 rounded-xl overflow-hidden bg-neutral-bg border-2 border-govt-border shadow-md ring-4 ring-primary/5">
                  {/* Placeholder avatar */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                    <span className="text-5xl font-heading font-bold text-primary/25">KR</span>
                  </div>
                </div>
                <h3 className="mt-5 font-heading font-bold text-base text-govt-text">
                  Dr. K. Ramesh Kumar
                </h3>
                <p className="text-sm text-govt-muted mt-0.5">M.Sc., Ph.D., NET</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-accent/10 rounded-full">
                  <p className="text-xs text-accent-dark font-semibold">
                    Head of Department
                  </p>
                </div>
              </div>

              {/* Message — elegant quote */}
              <div className="relative">
                <Quote size={48} className="text-accent/15 absolute -top-3 -left-1" />

                <div className="pl-12 sm:pl-14 md:pl-16">
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-5">
                    It gives me immense pleasure to welcome you to the Department of Zoology at
                    Government Degree College (Autonomous), Siddipet. Since our establishment in
                    1985, we have been committed to providing quality education in biological
                    sciences and nurturing students who can contribute meaningfully to society.
                  </p>
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-5">
                    Our department offers a dynamic learning environment with well-equipped
                    laboratories, a rich zoological museum, and innovative facilities like our
                    Vermi Technology Unit and BSF Waste Management Unit. We take pride in our
                    dedicated faculty, who bring both academic rigor and practical expertise to
                    the classroom.
                  </p>
                  <p className="text-govt-text leading-[1.85] text-[15px] mb-8">
                    I encourage all students to make the most of the opportunities available —
                    engage in research, participate in workshops, and develop the skills needed
                    for a successful career in the biological sciences. Together, let us continue
                    our tradition of academic excellence and scientific innovation.
                  </p>

                  {/* Signature — formal */}
                  <div className="border-t border-govt-border pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-0.5 bg-accent rounded-full" />
                      <div>
                        <p className="font-heading font-bold text-primary text-sm">
                          Dr. K. Ramesh Kumar
                        </p>
                        <p className="text-xs text-govt-muted mt-0.5">
                          Associate Professor &amp; Head, Department of Zoology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
