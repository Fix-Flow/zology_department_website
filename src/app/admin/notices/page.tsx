import Link from "next/link";
import { Plus, Bell, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteNoticeButton from "@/components/admin/buttons/DeleteNoticeButton";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-govt-text">
            Notices & Circulars
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage department notices, exam schedules, and circulars
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Notice
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Title
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Category
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Date
                </th>
                <th className="text-center px-5 py-3 font-semibold text-govt-text">
                  Status
                </th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {notices.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <Bell
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No notices found.</p>
                    <Link
                      href="/admin/notices/new"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Create your first notice
                    </Link>
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {notice.isNew && (
                          <Star
                            size={12}
                            className="text-accent fill-accent shrink-0"
                          />
                        )}
                        <span className="font-medium text-govt-text line-clamp-1">
                          {notice.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md capitalize">
                        {notice.category.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-muted">
                      {new Date(notice.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          notice.isNew ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/notices/${notice.id}/edit`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteNoticeButton id={notice.id} title={notice.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
