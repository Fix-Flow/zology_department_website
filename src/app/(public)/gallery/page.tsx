import { prisma } from "@/lib/prisma";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Department of Zoology",
  description: "Browse the photo gallery for glimpses of academic life, events, and facilities at the Department of Zoology.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Fetch all active gallery images
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main data-component="Gallery_Public_Page" className="min-h-screen bg-white">
      <PageHero
        title="Photo Gallery"
        subtitle="Glimpses of academic life, events, and facilities"
      />

      <section className="section-padding">
        <div className="section-container">
          <GalleryGrid images={images} />
        </div>
      </section>
    </main>
  );
}
