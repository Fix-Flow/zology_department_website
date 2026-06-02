import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoology Museum",
  description: "A rich collection of over 300 preserved specimens and rare osteological models.",
};

export default function MuseumPage() {
  return (
    <>
      <PageHero
        title="Zoology Museum"
        subtitle="A vital resource for taxonomic studies and comparative anatomy"
      />

      <div className="section-container section-padding">
        <div className="max-w-3xl mx-auto prose prose-blue prose-lg">
          <h2>About the Museum</h2>
          <p>
            The Zoology Museum houses a rich collection of over 300 preserved specimens, rare osteological models, and articulated skeletons. It serves as a vital resource for taxonomic studies and comparative anatomy for our students.
          </p>
          <h3>Collections</h3>
          <ul>
            <li>Invertebrate and Vertebrate preserved specimens</li>
            <li>Articulated human skeleton model</li>
            <li>Fossil replicas and evolutionary charts</li>
            <li>Taxidermy mounts</li>
          </ul>
          {/* Future content can be added here */}
          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-primary rounded-r-lg">
            <p className="text-sm text-gray-700 m-0">
              <strong>Note:</strong> Detailed catalog and virtual gallery of the Zoology Museum are currently being updated. Please check back soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
