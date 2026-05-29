"use client";

import { useState, useMemo } from "react";
import type { GalleryImage, GalleryCategory } from "@prisma/client";
import GalleryLightbox from "./GalleryLightbox";
import { ImageIcon } from "lucide-react";

interface GalleryGridProps {
  images: GalleryImage[];
}

const CATEGORIES: { label: string; value: GalleryCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Events", value: "EVENT" },
  { label: "Laboratories", value: "LAB" },
  { label: "Campus", value: "CAMPUS" },
  { label: "Museum", value: "MUSEUM" },
  { label: "Field Visits", value: "FIELD_VISIT" },
];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "ALL">("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (activeCategory === "ALL") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  if (images.length === 0) {
    return (
      <div className="py-20 text-center">
        <ImageIcon size={48} className="mx-auto text-govt-muted/30 mb-4" />
        <h3 className="text-xl font-heading font-semibold text-govt-text">No images found</h3>
        <p className="text-govt-muted mt-2">The photo gallery is currently empty.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.value
                ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                : "bg-white text-govt-muted border border-govt-border hover:border-primary/30 hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Empty State for Filters */}
      {filteredImages.length === 0 && (
        <div className="py-20 text-center bg-white rounded-2xl border border-govt-border">
          <ImageIcon size={48} className="mx-auto text-govt-muted/30 mb-4" />
          <h3 className="text-xl font-heading font-semibold text-govt-text">No matches found</h3>
          <p className="text-govt-muted mt-2">There are no images in this category yet.</p>
          <button 
            onClick={() => setActiveCategory("ALL")}
            className="mt-4 text-primary font-medium hover:underline"
          >
            View all images
          </button>
        </div>
      )}

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[250px]">
        {filteredImages.map((image, index) => {
          // Determine if image should be large (span 2 rows and/or columns) based on an algorithmic pattern
          // This creates a beautiful, pseudo-random masonry effect without complex JS calculation
          const isLargeVertical = index % 7 === 0 || index % 11 === 0;
          const isLargeHorizontal = index % 5 === 0 && !isLargeVertical;

          return (
            <div
              key={image.id}
              onClick={() => setLightboxIndex(index)}
              className={`relative group overflow-hidden rounded-xl bg-neutral-bg cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                isLargeVertical ? "row-span-2" : ""
              } ${isLargeHorizontal ? "col-span-2" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                <span className="inline-block self-start px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded capitalize mb-1.5 shadow-sm">
                  {image.category.replace("_", " ").toLowerCase()}
                </span>
                <p className="text-white/90 text-sm font-medium line-clamp-3 drop-shadow-md">
                  {image.alt}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Viewer */}
      <GalleryLightbox
        images={filteredImages}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
