"use client";

import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { formatDate, isNoticeNew } from "@/lib/utils";
import NoticeModal from "@/components/home/NoticeModal";

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
  CIRCULAR: "text-blue-600 bg-blue-50 border-blue-200",
  EXAM: "text-red-600 bg-red-50 border-red-200",
  SEMINAR: "text-purple-600 bg-purple-50 border-purple-200",
  RESULT: "text-green-600 bg-green-50 border-green-200",
  ADMISSION: "text-amber-600 bg-amber-50 border-amber-200",
  GENERAL: "text-gray-600 bg-gray-50 border-gray-200",
};

export default function NoticesPageClient({ notices }: { notices: Notice[] }) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "CIRCULAR", "EXAM", "SEMINAR", "RESULT", "ADMISSION", "GENERAL"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96 max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-govt-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
        
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "ALL" ? "All Notices" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-govt-border">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700">No notices found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="text-left bg-white border border-govt-border hover:border-primary/30 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border ${categoryColors[notice.category] || "text-gray-600 bg-gray-50 border-gray-200"}`}>
                  {notice.category}
                </span>
                {isNoticeNew(notice.isNew, notice.createdAt) && (
                  <span className="badge-new text-[10px] px-2 py-0.5">NEW</span>
                )}
              </div>
              
              <h3 className="font-heading font-semibold text-govt-text text-lg leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-4">
                {notice.title}
              </h3>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs font-medium text-govt-muted">
                  {formatDate(new Date(notice.date).toISOString())}
                </span>
                <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View details
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </>
  );
}
