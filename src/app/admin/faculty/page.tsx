import FacultyForm from "@/components/admin/forms/FacultyForm";
import AdminModal from "@/components/admin/AdminModal";
import Link from "next/link";
import { Plus, Users, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteFacultyButton from "@/components/admin/buttons/DeleteFacultyButton";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function AdminFacultyPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
    const editId = searchParams.edit;
    let editItem = null;
    if (editId) {
      editItem = await prisma.faculty.findUnique({ where: { id: editId } });
    }
  const facultyList = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-govt-text">
            Faculty Directory
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage teaching and non-teaching staff profiles
          </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden w-full max-w-full">
        <div className="w-full max-w-full overflow-x-auto table-scrollbar pb-2">
          <table className="w-full min-w-[800px] text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Name
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Designation
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Category
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Contact
                </th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {facultyList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <Users
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No faculty members found.</p>
                    <Link
                      href="?new=true"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Add your first faculty member
                    </Link>
                  </td>
                </tr>
              ) : (
                facultyList.map((faculty) => (
                  <tr
                    key={faculty.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {faculty.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={faculty.photo}
                            alt={faculty.name}
                            className="w-10 h-10 rounded-full object-cover border border-govt-border shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <span className="font-semibold text-sm">
                              {faculty.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-govt-text line-clamp-1">
                            {faculty.name}
                          </span>
                          <span className="text-xs text-govt-muted mt-0.5">
                            /{faculty.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-govt-text line-clamp-1">
                      {faculty.designation}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md capitalize">
                        {faculty.category.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-muted text-xs">
                      <div>{faculty.email}</div>
                      {faculty.phone && <div>{faculty.phone}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`?edit=${faculty.id}`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteFacultyButton id={faculty.id} name={faculty.name} />
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
                    Add Faculty
                  </Link>
      </div>
    
      {isNew && (
        <AdminModal returnTo="/admin/faculty">
          <FacultyForm />
        </AdminModal>
      )}
      {editItem && (
        <AdminModal returnTo="/admin/faculty">
          <FacultyForm faculty={editItem} />
        </AdminModal>
      )}
    </div>
  );
}
