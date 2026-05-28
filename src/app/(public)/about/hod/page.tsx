
export const metadata = {
  title: "HoD Message | About the Department",
};

export default function HodPage() {
  return (
    <div data-component="Hod_page" className="max-w-4xl">
      <div className="grid gap-8 md:grid-cols-[240px_1fr] items-start">
        <div className="flex flex-col items-center text-center">
          <div className="w-44 h-44 rounded-lg overflow-hidden bg-neutral-bg border-2 border-govt-border shadow-card">
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-heading font-bold text-primary/30">KR</span>
            </div>
          </div>
          <h3 className="mt-4 font-heading font-bold text-base text-govt-text">Dr. K. Ramesh Kumar</h3>
          <p className="text-sm text-govt-muted">M.Sc., Ph.D., NET</p>
          <p className="text-sm text-accent font-semibold mt-0.5">Associate Professor & Head</p>
          <p className="text-xs text-govt-muted mt-1">22 years of experience</p>
        </div>

        <div>
          <h2 className="font-heading text-section-head text-govt-text mb-1">Message from the HoD</h2>
          <span className="gold-divider" />

          <div className="mt-6 space-y-4 text-govt-text text-[15px] leading-relaxed">
            <p>Dear Students, Parents, and Visitors,</p>
            <p>
              It gives me immense pleasure to welcome you to the Department of Zoology at
              Government Degree College (Autonomous), Siddipet. Since our establishment in
              1985, we have been committed to providing quality education in biological
              sciences and nurturing students who can contribute meaningfully to society.
            </p>
            <p>
              Our department offers a dynamic learning environment with well-equipped
              laboratories, a rich zoological museum with 300+ specimens, and innovative
              facilities including our Vermi Technology Unit, BSF Waste Management Unit,
              and IoT-enabled aquaculture systems.
            </p>
            <p>
              We take pride in our dedicated faculty who bring both academic rigor and
              practical expertise to the classroom. Our students have consistently excelled
              in competitive examinations, with several qualifying UGC NET, GATE, and
              state-level civil services.
            </p>
            <p>
              I encourage all students to make the most of the opportunities available —
              engage in research, participate in workshops and seminars, undertake field
              visits, and develop the skills needed for a successful career in biological
              sciences and allied fields.
            </p>
            <p>With warm regards,</p>
          </div>
          <div className="border-t border-govt-border pt-4 mt-6">
            <p className="font-heading font-bold text-primary text-sm">Dr. K. Ramesh Kumar</p>
            <p className="text-xs text-govt-muted">Associate Professor & Head, Department of Zoology</p>
            <p className="text-xs text-govt-muted">Government Degree College (Autonomous), Siddipet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
