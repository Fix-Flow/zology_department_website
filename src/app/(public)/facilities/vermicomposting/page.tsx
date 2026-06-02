import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vermi Technology Unit",
  description: "An eco-friendly initiative and skill-development unit for solid waste management.",
};

export default function VermicompostingPage() {
  return (
    <>
      <PageHero
        title="Vermi Technology Unit"
        subtitle="Skill development and solid waste management through vermicomposting"
      />

      <div className="section-container section-padding">
        <div className="max-w-3xl mx-auto prose prose-blue prose-lg">
          <h2>About the Unit</h2>
          <p>
            The Vermi Technology Unit is an eco-friendly initiative and skill-development center where students learn solid waste management techniques. We focus on utilizing <em>Eisenia fetida</em> for composting organic waste.
          </p>
          <h3>Key Objectives</h3>
          <ul>
            <li>To promote organic farming and sustainable agriculture.</li>
            <li>To train students in entrepreneurship and self-employment.</li>
            <li>To manage biodegradable waste effectively on campus.</li>
          </ul>
          {/* Future content can be added here */}
          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-primary rounded-r-lg">
            <p className="text-sm text-gray-700 m-0">
              <strong>Note:</strong> Detailed content, photos, and project reports for the Vermi Technology Unit are currently being updated. Please check back soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
