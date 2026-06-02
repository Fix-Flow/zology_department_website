"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation, NavItem } from "@/data/navigation";
import { SITE_NAME } from "@/lib/constants";


export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Hamburger Button — larger tap target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-primary/5 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} className="text-primary" />
        ) : (
          <Menu size={24} className="text-primary" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header — with branding */}
        <div className="flex items-center justify-between p-4 border-b border-govt-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 shrink-0">
              <Image 
                src="/images/zoology-logo-1.png" 
                alt="Zoology Department Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading font-bold text-primary text-sm">
              {SITE_NAME}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-bg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-govt-muted" />
          </button>
        </div>

        {/* Gold accent */}
        <div className="h-0.5 bg-gradient-to-r from-accent to-accent-dark" />

        {/* Nav Items */}
        <nav className="overflow-y-auto h-[calc(100%-65px)] py-2">
          {navigation.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              isDropdownOpen={openDropdown === item.label}
              onToggleDropdown={() => toggleDropdown(item.label)}
              onClose={() => setIsOpen(false)}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

function MobileNavItem({
  item,
  isDropdownOpen,
  onToggleDropdown,
  onClose,
}: {
  item: NavItem;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onClose: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block px-5 py-3.5 text-sm font-semibold text-govt-text hover:bg-primary/[0.04] hover:text-primary transition-colors min-h-[48px] flex items-center"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div data-component="MobileNav">
      <button
        onClick={onToggleDropdown}
        className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-govt-text hover:bg-primary/[0.04] transition-colors min-h-[48px]"
        aria-expanded={isDropdownOpen}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={`text-govt-muted transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Children */}
      <div
        className={`overflow-hidden transition-all duration-250 bg-neutral-bg/50 ${
          isDropdownOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <Link
          href={item.href}
          onClick={(e) => {
            if (item.href === "#") {
              e.preventDefault();
            } else {
              onClose();
            }
          }}
          className="block px-8 py-3 text-sm text-govt-muted hover:text-primary hover:bg-primary/[0.04] transition-colors min-h-[44px] flex items-center"
        >
          All {item.label}
        </Link>
        {item.children!.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            onClick={onClose}
            className="block px-8 py-3 text-sm text-govt-muted hover:text-primary hover:bg-primary/[0.04] transition-colors min-h-[44px] flex items-center"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
