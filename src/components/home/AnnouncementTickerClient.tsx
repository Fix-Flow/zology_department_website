"use client";

import { useState } from "react";
import Link from "next/link";
import NoticeModal from "./NoticeModal";
import { isNoticeNew } from "@/lib/utils";

type Notice = {
  id: string;
  title: string;
  content: string | null;
  date: Date;
  category: string;
  attachmentUrl: string | null;
  isNew: boolean;
  createdAt: Date;
};

export default function AnnouncementTickerClient({
  notices,
}: {
  notices: Notice[];
}) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const activeNotices = notices.slice(0, 8);

  if (activeNotices.length === 0) return null;

  return (
    <>
      <div data-component="AnnouncementTickerClient" className="announcement-ticker" aria-label="Announcements">
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
                <button
                  key={`${notice.id}-${i}`}
                  onClick={() => setSelectedNotice(notice)}
                  className="announcement-ticker-item hover:text-primary transition-colors text-left"
                >
                  {isNoticeNew(notice.isNew, notice.createdAt) && (
                    <span className="badge-new text-[9px] px-1.5 py-0">NEW</span>
                  )}
                  <span>{notice.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </>
  );
}
