"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Users,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Download,
  Settings,
  UserCog,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Notices", href: "/admin/notices", icon: Bell },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Publications", href: "/admin/publications", icon: FileText },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Downloads", href: "/admin/downloads", icon: Download },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: UserCog },
];

import { X } from "lucide-react";

type AdminSidebarProps = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
};

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#0f1d35] text-white flex flex-col z-50 transition-all duration-300 border-r border-white/5",
          collapsed ? "w-[68px]" : "w-[240px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <GraduationCap size={20} className="text-white" />
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-bold leading-tight truncate">
                  Zoology Dept
                </p>
                <p className="text-[10px] text-white/50 leading-tight truncate">
                  Admin Panel
                </p>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          <button 
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                  )}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop Only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-12 items-center justify-center border-t border-white/10 text-white/40 hover:text-white/80 transition-colors shrink-0"
        >
          <ChevronLeft
            size={18}
            className={cn(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </aside>
    </>
  );
}
