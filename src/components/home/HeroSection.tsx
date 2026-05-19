"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_NAME, COLLEGE_NAME, NAAC_GRADE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden" id="hero">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-primary/30" />

      <div className="section-container relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* NAAC Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full mb-6 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wide uppercase">
              NAAC Accredited &lsquo;{NAAC_GRADE}&rsquo; Grade
            </span>
          </div>

          {/* Department Name */}
          <h1 className="font-heading text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {SITE_NAME}
          </h1>

          {/* College Name */}
          <p className="mt-3 text-white/70 text-base sm:text-lg font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {COLLEGE_NAME}
          </p>

          {/* Tagline */}
          <p className="mt-4 text-white/50 text-sm sm:text-base max-w-xl leading-relaxed font-body animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Nurturing scientific temper, academic excellence, and innovation in
            biological sciences since 1985.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/courses"
              className="btn-accent group"
            >
              Explore Courses
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/admissions"
              className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-primary"
            >
              View Admissions
            </Link>
          </div>
        </div>

        {/* Decorative element — right side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="w-72 h-72 rounded-full border border-white/5" />
          <div className="absolute top-8 left-8 w-56 h-56 rounded-full border border-white/5" />
          <div className="absolute top-16 left-16 w-40 h-40 rounded-full border border-accent/10" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-accent" />
    </section>
  );
}
