"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, FileText, ArrowRight } from "lucide-react";
import { formatDate, isNoticeNew } from "@/lib/utils";
import NoticeModal from "./NoticeModal";

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

const categoryColors: Record<string, string> = {
  CIRCULAR: "text-blue-600",
  EXAM: "text-red-600",
  SEMINAR: "text-purple-600",
  RESULT: "text-green-600",
  ADMISSION: "text-amber-600",
  GENERAL: "text-gray-600",
};

export default function NoticeBoardClient({ notices }: { notices: Notice[] }) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  return (
    <>
      <div className="notice-panel sticky top-28">
        <div className="notice-panel-header">
          <Bell size={16} />
          <span>Notice Board</span>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {notices.length === 0 ? (
            <div className="p-8 text-center text-govt-muted text-sm">
              No notices posted yet.
            </div>
          ) : (
            notices.map((notice) => (
              <button
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="notice-item group w-full text-left"
              >
                <div className="shrink-0 mt-0.5">
                  <FileText
                    size={16}
                    className={categoryColors[notice.category] || "text-gray-500"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-medium text-govt-text group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {notice.title}
                    </p>
                    {isNoticeNew(notice.isNew, notice.createdAt) && (
                      <span className="badge-new text-[8px] px-1.5 py-0 shrink-0 mt-0.5">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-govt-muted mt-1.5">
                    {formatDate(notice.date.toISOString())}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* View All */}
        <div className="p-3.5 border-t border-govt-border text-center bg-neutral-bg/50">
          <Link
            href="/notices"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 group"
          >
            View All Notices
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </>
  );
}
