"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@prisma/client";

interface GalleryLightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialIndex]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  }, [images.length, isAnimating]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="text-white/90 drop-shadow-md">
          <p className="font-medium text-lg max-w-2xl">{currentImage.alt}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded capitalize">
              {currentImage.category.replace("_", " ").toLowerCase()}
            </span>
            <span className="text-sm text-white/70">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors pointer-events-auto shrink-0"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
        onClick={onClose} // Clicking outside image closes modal
      >
        <div 
          className="relative w-full max-w-6xl h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image wrapper
        >
          {/* We use standard img to easily handle natural aspect ratios without tricky absolute fills */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
          />
        </div>
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </div>
  );
}
