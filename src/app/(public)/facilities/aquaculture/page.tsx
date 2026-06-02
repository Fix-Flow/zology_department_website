import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fisheries & Aquaculture Lab",
  description: "A modern facility for B.Sc. Fisheries students to study fish breeding and aquaculture techniques.",
};

export default function AquaculturePage() {
  return (
    <>
      <PageHero
        title="Fisheries & Aquaculture Lab"
        subtitle="Hands-on training in water quality management and modern aquaculture"
      />

      <div className="section-container section-padding">
        <div className="max-w-3xl mx-auto prose prose-blue prose-lg">
          <h2>About the Laboratory</h2>
          <p>
            The Aquaculture & IoT Station is a modern facility dedicated to B.Sc. Fisheries students. It provides hands-on experience in fish breeding, water quality management, and modern aquaculture techniques.
          </p>
          <h3>Key Facilities</h3>
          <ul>
            <li>Glass aquariums for ornamental fish breeding.</li>
            <li>Biofloc tanks for high-density farming models.</li>
            <li>IoT water quality sensors for real-time monitoring.</li>
            <li>Advanced aeration and filtration systems.</li>
          </ul>
          {/* Future content can be added here */}
          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-primary rounded-r-lg">
            <p className="text-sm text-gray-700 m-0">
              <strong>Note:</strong> Detailed content, photos, and project reports for the Aquaculture Lab are currently being updated. Please check back soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
