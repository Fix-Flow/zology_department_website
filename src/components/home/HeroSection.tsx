"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_NAME, COLLEGE_NAME, NAAC_GRADE } from "@/lib/constants";


export default function HeroSection() {
  return (
    <section data-component="HeroSection" className="relative bg-primary overflow-hidden" id="hero">
      {/* Background Image — increased visibility */}
      <div className="absolute inset-0 opacity-25 mix-blend-overlay">
        <Image
          src="/images/og-image.jpg"
          alt={`${SITE_NAME} Campus`}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Primary gradient overlay — dramatic depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/60 via-primary/20 to-primary-dark/40" />

      {/* Subtle radial vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(15, 35, 71, 0.4) 100%)' }} />

      <div className="section-container relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* NAAC Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 border border-accent/25 rounded-full mb-7 animate-fade-in backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wide uppercase">
              NAAC Accredited &lsquo;{NAAC_GRADE}&rsquo; Grade
            </span>
          </div>

          {/* Department Name — larger, more confident */}
          <h1 className="font-heading text-white text-[clamp(2.25rem,6vw+1rem,4rem)] font-bold leading-[1.1] tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {SITE_NAME}
          </h1>

          {/* College Name */}
          <p className="mt-4 text-white/80 text-[clamp(1rem,3vw+0.5rem,1.25rem)] font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {COLLEGE_NAME}
          </p>

          {/* Tagline — better spacing and visibility */}
          <p className="mt-5 text-white/65 text-sm sm:text-base max-w-xl leading-relaxed font-body animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Nurturing scientific temper, academic excellence, and innovation in
            biological sciences since 1985.
          </p>

          {/* CTA Buttons — stronger hierarchy */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/courses"
              className="btn-accent group w-full sm:w-auto justify-center text-base px-8 py-3.5 shadow-lg shadow-accent/20"
            >
              Explore Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-[15px] font-semibold text-white/90 bg-white/10 border border-white/20 rounded-[10px] backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all"
            >
              View Admissions
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent — gradient bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent-dark to-accent" />
    </section>
  );
}
