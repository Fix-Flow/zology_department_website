"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface AdminModalProps {
  children: React.ReactNode;
  returnTo: string;
}

export default function AdminModal({ children, returnTo }: AdminModalProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    router.push(returnTo);
  };

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div 
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-bg text-govt-muted hover:text-govt-text transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
