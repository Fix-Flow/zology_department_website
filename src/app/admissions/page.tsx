import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link2, CheckCircle2, FileText, CalendarClock } from "lucide-react";
import type { Metadata } from "next";
import { ADMISSIONS_URL, COLLEGE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Admission process and guidelines for UG and PG Zoology programmes at GDC Siddipet via DOST and CPGET.",
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Join our community of biological science scholars through a transparent, merit-based admission process"
      />

      <div className="section-container section-padding">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Undergraduate Admissions */}
          <section className="space-y-6">
            <SectionHeader
              title="Undergraduate Admissions (B.Sc.)"
              subtitle="Admission via DOST (Degree Online Services, Telangana)"
            />
            
            <div className="card-static p-6 sm:p-8">
              <p className="text-govt-text leading-relaxed mb-6">
                Admissions to all undergraduate programmes (B.Sc. Zoology, B.Sc. Fisheries & Aquaculture) 
                are conducted exclusively through the DOST portal established by the Government of Telangana. 
                The process is completely online, merit-based, and follows the reservation policies of the state government.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-lg text-govt-text mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Eligibility
                  </h4>
                  <p className="text-sm text-govt-muted">
                    Intermediate (10+2) or equivalent with Biological Sciences from a recognized board.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-lg text-govt-text mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    Required Documents
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Aadhaar Card",
                      "Color Passport Size Photo",
                      "SSC Memo",
                      "Intermediate Memo",
                      "Caste Certificate (if applicable)",
                      "Income Certificate (if applicable)",
                      "Transfer Certificate (TC)",
                      "Study Certificates (4th to 12th)",
                    ].map((doc, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-govt-muted">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-govt-border">
                  <a
                    href={ADMISSIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto justify-center"
                  >
                    Apply via DOST Portal
                    <Link2 size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Postgraduate Admissions */}
          <section className="space-y-6">
            <SectionHeader
              title="Postgraduate Admissions (M.Sc.)"
              subtitle="Admission via CPGET (Common Post Graduate Entrance Tests)"
            />
            
            <div className="card-static p-6 sm:p-8">
              <p className="text-govt-text leading-relaxed mb-6">
                Admissions to the M.Sc. Zoology programme are based on the rank obtained in the 
                Common Post Graduate Entrance Tests (CPGET) conducted by Osmania University. 
                Candidates must participate in the web counseling process and select {COLLEGE_NAME}.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-bold text-lg text-govt-text mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Eligibility
                  </h4>
                  <p className="text-sm text-govt-muted">
                    B.Sc. Degree with Zoology as one of the optional subjects with a minimum of 40% marks in the concerned science subject.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-lg text-govt-text mb-3 flex items-center gap-2">
                    <CalendarClock size={18} className="text-primary" />
                    Admission Timeline (Tentative)
                  </h4>
                  <div className="space-y-3">
                    {[
                      { step: "CPGET Notification", time: "May/June" },
                      { step: "Entrance Examination", time: "July" },
                      { step: "Results Declaration", time: "August" },
                      { step: "Web Counseling", time: "August/September" },
                      { step: "Commencement of Classes", time: "September/October" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-neutral-bg rounded-lg border border-govt-border">
                        <span className="text-sm font-medium text-govt-text">{item.step}</span>
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-md">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-govt-border">
                  <a
                    href="https://cpget.tsche.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto justify-center"
                  >
                    Visit CPGET Portal
                    <Link2 size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
