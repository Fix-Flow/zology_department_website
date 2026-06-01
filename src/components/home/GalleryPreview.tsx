import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SectionHeader from "@/components/ui/SectionHeader";


export default async function GalleryPreview() {
  const previewImages = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (previewImages.length === 0) return null;

  return (
    <section data-component="GalleryPreview" className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            title="Photo Gallery"
            subtitle="Glimpses of academic life, events, and facilities"
            className="!mb-0"
          />
          <Link
            href="/gallery"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0 group"
          >
            View Full Gallery
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {previewImages.map((image, index) => {
            // Vary heights for masonry effect
            const isLarge = index === 0 || index === 3;

            return (
              <Link
                key={image.id}
                href="/gallery"
                className={`relative group overflow-hidden rounded-xl bg-neutral-bg ${
                  isLarge ? "row-span-2" : ""
                }`}
                style={{ minHeight: isLarge ? "480px" : "240px" }}
              >
                {/* Show real image if available, otherwise placeholder */}
                {image.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5 transition-colors group-hover:bg-primary/8">
                    <ImageIcon size={isLarge ? 48 : 32} className="text-primary/10" />
                  </div>
                )}

                {/* Hover overlay — smoother gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-primary/90 text-white text-[10px] font-semibold rounded-md capitalize mb-2 backdrop-blur-sm">
                    {image.category.replace("_", " ").toLowerCase()}
                  </span>
                  <p className="text-white/90 text-xs sm:text-sm font-medium line-clamp-3 drop-shadow-lg">
                    {image.alt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/gallery" className="btn-outline text-sm">
            View Full Gallery
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
