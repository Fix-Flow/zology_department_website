import DownloadForm from "@/components/admin/forms/DownloadForm";
import AdminModal from "@/components/admin/AdminModal";
import Link from "next/link";
import { Plus, Download as DownloadIcon, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteDownloadButton from "@/components/admin/buttons/DeleteDownloadButton";


export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function AdminDownloadsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
    const editId = searchParams.edit;
    let editItem = null;
    if (editId) {
      editItem = await prisma.download.findUnique({ where: { id: editId } });
    }
  const downloads = await prisma.download.findMany({
    where: { isActive: true },
    include: {
      history: {
        orderBy: { editedAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div data-component="Downloads_page" className="space-y-6 w-full max-w-full">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-govt-text">
            Downloads & Resources
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage files available for students and public to download
          </p>
      </div>

      <div className="bg-white rounded-xl border border-govt-border w-full max-w-full">
        <div className="w-full max-w-full overflow-x-auto xl:overflow-visible table-scrollbar pb-2">
          <table className="w-full min-w-[800px] text-sm whitespace-nowrap border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="bg-neutral-bg border-b border-govt-border text-left px-5 py-3 font-semibold text-govt-text rounded-tl-xl">
                  Title & Size
                </th>
                <th className="bg-neutral-bg border-b border-govt-border text-left px-5 py-3 font-semibold text-govt-text">
                  Category
                </th>
                <th className="bg-neutral-bg border-b border-govt-border text-left px-5 py-3 font-semibold text-govt-text">
                  Date Added
                </th>
                <th className="bg-neutral-bg border-b border-govt-border text-left px-5 py-3 font-semibold text-govt-text">
                  Last Edited
                </th>
                <th className="bg-neutral-bg border-b border-govt-border text-right px-5 py-3 font-semibold text-govt-text rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:border-b [&>tr>td]:border-govt-border [&>tr:last-child>td]:border-b-0 [&>tr:last-child>td:first-child]:rounded-bl-xl [&>tr:last-child>td:last-child]:rounded-br-xl">
              {downloads.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <DownloadIcon
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No downloads found.</p>
                    <Link
                      href="?new=true"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Add your first resource
                    </Link>
                  </td>
                </tr>
              ) : (
                downloads.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3 max-w-[400px]">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-govt-text line-clamp-1">
                            {item.title}
                          </span>
                          {item.isFeatured && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                              ★ Featured
                            </span>
                          )}
                        </div>
                        {item.fileSize && (
                          <span className="text-xs text-govt-muted mt-1 line-clamp-1">
                            {item.fileSize}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md capitalize">
                        {item.category.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-text">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-govt-text">
                      {item.history && item.history.length > 0 ? (
                        <div className="flex items-center gap-3">
                          <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                          <div className="relative group">
                            <button type="button" className="text-[11px] font-medium bg-neutral-bg border border-govt-border rounded-full px-2.5 py-1 outline-none group-hover:border-primary group-hover:text-primary transition-colors text-govt-muted whitespace-nowrap flex items-center gap-1">
                              History <span className="bg-govt-border/50 text-govt-text rounded-full px-1.5 py-0.5 text-[9px]">{item.history.length}</span>
                            </button>
                            <div className="absolute right-0 top-full mt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-govt-border rounded-xl shadow-xl py-2 z-[60] w-max max-h-48 overflow-y-auto min-w-[160px]">
                              <div className="px-3 pb-1 mb-1 border-b border-govt-border text-right">
                                <span className="text-[10px] font-bold text-govt-muted uppercase tracking-wider">Edit History</span>
                              </div>
                              <ul className="text-xs flex flex-col text-right">
                                {item.history.map((hist) => (
                                  <li key={hist.id} className="text-govt-text whitespace-nowrap px-3 py-1.5 hover:bg-neutral-bg">
                                    {new Date(hist.editedAt).toLocaleString(undefined, {
                                      dateStyle: 'medium',
                                      timeStyle: 'short'
                                    })}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-govt-muted italic text-sm">Never</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-neutral-bg text-govt-muted rounded-lg transition-colors"
                          title="View File"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <Link
                          href={`?edit=${item.id}`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteDownloadButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
                    href="?new=true"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus size={16} />
                    Add Resource
                  </Link>
      </div>
    
      {isNew && (
        <AdminModal returnTo="/admin/downloads">
          <DownloadForm />
        </AdminModal>
      )}
      {editItem && (
        <AdminModal returnTo="/admin/downloads">
          <DownloadForm download={editItem} />
        </AdminModal>
      )}
    </div>
  );
}
