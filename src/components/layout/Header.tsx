"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigation, NavItem } from "@/data/navigation";
import { SITE_NAME, COLLEGE_SHORT, NAAC_GRADE } from "@/lib/constants";
import MobileNav from "./MobileNav";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header data-component="Header"
      className={`sticky top-0 z-30 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="section-container flex h-full items-center justify-between">
        {/* Left: Logo & Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* Placeholder logo — circle with emblem styling */}
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-heading font-bold text-lg">Z</span>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-heading font-bold text-primary text-xs sm:text-sm leading-tight line-clamp-2 sm:line-clamp-1">
              {SITE_NAME}
            </h1>
            <p className="hidden xs:block text-[10px] sm:text-[11px] text-govt-muted leading-tight mt-0.5 truncate">
              {COLLEGE_SHORT} · NAAC &lsquo;{NAAC_GRADE}&rsquo; Grade
            </p>
          </div>
        </Link>

        {/* Center/Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center" aria-label="Main navigation">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>

        {/* Mobile: Hamburger */}
        <MobileNav />
      </div>
    </header>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasChildren = item.children && item.children.length > 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          className="block px-2.5 py-2 text-[13px] font-semibold text-govt-text hover:text-primary transition-colors rounded-md hover:bg-primary/5"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 px-2.5 py-2 text-[13px] font-semibold text-govt-text hover:text-primary transition-colors rounded-md hover:bg-primary/5"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => {
          if (item.href === "#") {
            e.preventDefault();
          }
        }}
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`text-govt-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Link>

      {/* Dropdown */}
      <div
        className={`absolute left-0 top-full pt-1 z-50 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-govt-border py-1.5 min-w-[220px]">
          {/* Gold accent line at top */}
          <div className="h-0.5 bg-accent mx-3 mb-1.5 rounded-full" />

          {item.children!.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-4 py-2 text-sm text-govt-text hover:text-primary hover:bg-neutral-bg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
