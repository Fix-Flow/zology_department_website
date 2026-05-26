import CourseForm from "@/components/admin/forms/CourseForm";
import AdminModal from "@/components/admin/AdminModal";
import Link from "next/link";
import { Plus, BookOpen, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteCourseButton from "@/components/admin/buttons/DeleteCourseButton";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function AdminCoursesPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
    const editId = searchParams.edit;
    let editItem = null;
    if (editId) {
      editItem = await prisma.course.findUnique({ where: { id: editId } });
    }
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { level: "asc" },
  });

  return (
    <div className="space-y-6 w-full max-w-full">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-govt-text">
            Courses Offered
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage academic programs and syllabus information
          </p>
      </div>

      <div className="bg-white rounded-xl border border-govt-border overflow-hidden w-full max-w-full">
        <div className="w-full max-w-full overflow-x-auto table-scrollbar pb-2">
          <table className="w-full min-w-[800px] text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Course Title
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Level
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Duration
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Intake
                </th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {courses.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <BookOpen
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No courses found.</p>
                    <Link
                      href="?new=true"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Add your first course
                    </Link>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-govt-text line-clamp-1">
                          {course.title}
                        </span>
                        <span className="text-xs text-govt-muted mt-0.5">
                          /{course.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md uppercase">
                        {course.level}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-text">
                      {course.duration}
                    </td>
                    <td className="px-5 py-3 text-govt-text">
                      {course.intake} seats
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`?edit=${course.id}`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteCourseButton id={course.id} title={course.title} />
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
                    Add Course
                  </Link>
      </div>
    
      {isNew && (
        <AdminModal returnTo="/admin/courses">
          <CourseForm />
        </AdminModal>
      )}
      {editItem && (
        <AdminModal returnTo="/admin/courses">
          <CourseForm course={editItem} />
        </AdminModal>
      )}
    </div>
  );
}
