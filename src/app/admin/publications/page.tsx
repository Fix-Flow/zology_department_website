import Link from "next/link";
import { Plus, FileText, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeletePublicationButton from "@/components/admin/buttons/DeletePublicationButton";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  const publications = await prisma.publication.findMany({
    where: { isActive: true },
    orderBy: { year: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-govt-text">
            Research Publications
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage research papers, books, and chapters
          </p>
        </div>
        <Link
          href="/admin/publications/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Publication
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Title & Authors
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Type
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Journal / Publisher
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Year
                </th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {publications.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <FileText
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No publications found.</p>
                    <Link
                      href="/admin/publications/new"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Add your first publication
                    </Link>
                  </td>
                </tr>
              ) : (
                publications.map((pub) => (
                  <tr
                    key={pub.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3 max-w-[400px]">
                      <div className="flex flex-col">
                        <span className="font-medium text-govt-text line-clamp-2">
                          {pub.title}
                        </span>
                        <span className="text-xs text-govt-muted mt-1 line-clamp-1">
                          {pub.authors.join(", ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md capitalize">
                        {pub.type.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-text line-clamp-2">
                      {pub.journal}
                    </td>
                    <td className="px-5 py-3 text-govt-text">
                      {pub.year}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/publications/${pub.id}/edit`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeletePublicationButton id={pub.id} title={pub.title} />
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
