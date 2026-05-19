import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            title="Photo Gallery"
            subtitle="Glimpses of academic life, events, and facilities"
            className="!mb-0"
          />
          <Link
            href="/gallery"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0"
          >
            View Full Gallery
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {previewImages.map((image, index) => {
            // Vary heights for masonry effect
            const isLarge = index === 0 || index === 3;

            return (
              <Link
                key={image.id}
                href="/gallery"
                className={`relative group overflow-hidden rounded-lg bg-neutral-bg ${
                  isLarge ? "row-span-2" : ""
                }`}
                style={{ minHeight: isLarge ? "300px" : "150px" }}
              >
                {/* Placeholder with icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                  <ImageIcon size={isLarge ? 48 : 32} className="text-primary/15" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-end">
                  <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                      {image.alt}
                    </p>
                    <span className="text-white/60 text-[10px] uppercase tracking-wider mt-1 inline-block">
                      {image.category.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-6 text-center sm:hidden">
          <Link href="/gallery" className="btn-outline text-sm">
            View Full Gallery
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
