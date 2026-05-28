"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Eye, Target, MessageSquareQuote, Trophy } from "lucide-react";


export const tabs = [
  { id: "", label: "History", icon: <History size={16} /> },
  { id: "vision", label: "Vision & Mission", icon: <Eye size={16} /> },
  { id: "objectives", label: "Objectives", icon: <Target size={16} /> },
  { id: "hod", label: "HoD Message", icon: <MessageSquareQuote size={16} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={16} /> },
];

export default function AboutTabs() {
  const pathname = usePathname();

  return (
    <div data-component="AboutTabs" className="tab-group mb-10 overflow-x-auto overflow-y-hidden md:overflow-visible scrollbar-hide flex-nowrap md:flex-wrap">
      {tabs.map((tab) => {
        const href = tab.id === "" ? "/about" : `/about/${tab.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={tab.id}
            href={href}
            className={`tab-item flex items-center gap-2 whitespace-nowrap ${
              isActive ? "active" : ""
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
