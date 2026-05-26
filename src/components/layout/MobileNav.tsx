"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation, NavItem } from "@/data/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-primary/5 transition-colors"
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
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-govt-border">
          <span className="font-heading font-bold text-primary text-sm">
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-bg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-govt-muted" />
          </button>
        </div>

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
        className="block px-5 py-3 text-sm font-semibold text-govt-text hover:bg-neutral-bg hover:text-primary transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggleDropdown}
        className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold text-govt-text hover:bg-neutral-bg transition-colors"
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
        className={`overflow-hidden transition-all duration-200 ${
          isDropdownOpen ? "max-h-96" : "max-h-0"
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
          className="block px-8 py-2.5 text-sm text-govt-muted hover:text-primary hover:bg-neutral-bg transition-colors"
        >
          All {item.label}
        </Link>
        {item.children!.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            onClick={onClose}
            className="block px-8 py-2.5 text-sm text-govt-muted hover:text-primary hover:bg-neutral-bg transition-colors"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
