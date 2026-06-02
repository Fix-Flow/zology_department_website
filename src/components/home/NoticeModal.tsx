"use client";

import Link from "next/link";
import { X, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Notice = {
  id: string;
  title: string;
  content: string | null;
  date: Date;
  category: string;
  attachmentUrl: string | null;
  isNew: boolean;
};

const categoryColors: Record<string, string> = {
  CIRCULAR: "text-blue-600",
  EXAM: "text-red-600",
  SEMINAR: "text-purple-600",
  RESULT: "text-green-600",
  ADMISSION: "text-amber-600",
  GENERAL: "text-gray-600",
};

interface NoticeModalProps {
  notice: Notice;
  onClose: () => void;
}

export default function NoticeModal({ notice, onClose }: NoticeModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-govt-border bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 uppercase tracking-wide ${
                categoryColors[notice.category] || "text-gray-600"
              }`}
            >
              {notice.category}
            </span>
            <span className="text-xs text-govt-muted font-medium">
              {formatDate(new Date(notice.date).toISOString())}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-govt-text leading-snug mb-4">
            {notice.title}
          </h3>

          {notice.content && (
            <div className="text-sm text-govt-muted leading-relaxed whitespace-pre-wrap mb-6">
              {notice.content}
            </div>
          )}

          {notice.attachmentUrl && (
            <div className="flex flex-col gap-3 mt-2">
              {!notice.content && (
                <p className="text-sm text-govt-muted mb-2">
                  An attachment is available for this notice.
                </p>
              )}
              <Link
                href={notice.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto"
              >
                View Attachment
                <ExternalLink size={16} />
              </Link>
            </div>
          )}

          {!notice.attachmentUrl && !notice.content && (
            <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-100">
              No additional content or attachment available for this notice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
