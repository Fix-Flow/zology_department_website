"use client";

import Link from "next/link";
import { notices } from "@/data/notices";

export default function AnnouncementTicker() {
  const activeNotices = notices.filter((n) => n.isNew || true).slice(0, 8);

  return (
    <div className="announcement-ticker" aria-label="Announcements">
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 bg-accent px-4 py-2 flex items-center gap-1.5 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-dark opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-dark" />
          </span>
          <span className="text-xs font-bold text-primary-dark uppercase tracking-wider whitespace-nowrap">
            Notices
          </span>
        </div>

        {/* Scrolling Track */}
        <div className="overflow-hidden flex-1">
          <div className="announcement-ticker-track">
            {/* Duplicate notices for seamless scroll loop */}
            {[...activeNotices, ...activeNotices].map((notice, i) => (
              <Link
                key={`${notice.id}-${i}`}
                href={notice.attachmentUrl || "#"}
                className="announcement-ticker-item hover:text-primary transition-colors"
              >
                {notice.isNew && (
                  <span className="badge-new text-[9px] px-1.5 py-0">NEW</span>
                )}
                <span>{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
