"use client";

import { useState } from "react";
import {
  History,
  Eye,
  Target,
  MessageSquareQuote,
  Trophy,
  Star,
  Users,
  BookOpen,
  Microscope,
  Award,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ESTABLISHED_YEAR, COLLEGE_NAME } from "@/lib/constants";

const tabs = [
  { id: "history", label: "History", icon: <History size={16} /> },
  { id: "vision", label: "Vision & Mission", icon: <Eye size={16} /> },
  { id: "objectives", label: "Objectives", icon: <Target size={16} /> },
  { id: "hod", label: "HoD Message", icon: <MessageSquareQuote size={16} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={16} /> },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <>
      <PageHero
        title="About the Department"
        subtitle="Learn about our history, vision, and commitment to academic excellence in Zoology"
      />

      <div className="section-container section-padding">
        {/* Tab Navigation */}
        <div className="tab-group mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-item flex items-center gap-2 ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === "history" && <HistoryTab />}
          {activeTab === "vision" && <VisionMissionTab />}
          {activeTab === "objectives" && <ObjectivesTab />}
          {activeTab === "hod" && <HodTab />}
          {activeTab === "achievements" && <AchievementsTab />}
        </div>
      </div>
    </>
  );
}

/* ─── HISTORY TAB ─── */
function HistoryTab() {
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
    <div>
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

/* ─── VISION & MISSION TAB ─── */
function VisionMissionTab() {
  return (
    <div className="space-y-10 max-w-4xl">
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

/* ─── OBJECTIVES TAB ─── */
function ObjectivesTab() {
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
    <div className="max-w-3xl">
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

/* ─── HOD MESSAGE TAB ─── */
function HodTab() {
  return (
    <div className="max-w-4xl">
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

/* ─── ACHIEVEMENTS TAB ─── */
function AchievementsTab() {
  const achievements = [
    { icon: <Award size={24} />, title: "NAAC 'A' Grade Accreditation", description: "College accredited with 'A' grade by National Assessment and Accreditation Council.", year: "2018", color: "bg-amber-50 text-amber-600" },
    { icon: <Trophy size={24} />, title: "Best Department Award", description: "Recognized as the Best Department in Science Faculty by the university for academic performance.", year: "2023", color: "bg-blue-50 text-blue-600" },
    { icon: <Star size={24} />, title: "85+ Research Publications", description: "Faculty and research scholars have published 85+ papers in national and international peer-reviewed journals.", year: "2024", color: "bg-green-50 text-green-600" },
    { icon: <Users size={24} />, title: "UGC NET Qualifiers", description: "12+ students qualified UGC NET/JRF in Life Sciences over the past 5 years.", year: "2024", color: "bg-purple-50 text-purple-600" },
    { icon: <Microscope size={24} />, title: "Innovation Hub Established", description: "Established BSF Waste Management Unit, Vermi Technology Unit, and IoT-based Aquaculture monitoring systems.", year: "2022", color: "bg-rose-50 text-rose-600" },
    { icon: <BookOpen size={24} />, title: "MoU with ICAR-CIFA", description: "Signed MoU with ICAR-CIFA, Bhubaneswar for collaborative research in sustainable aquaculture.", year: "2024", color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div>
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
