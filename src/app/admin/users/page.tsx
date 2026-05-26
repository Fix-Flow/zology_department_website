import Link from "next/link";
import { Plus, Shield, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ToggleUserStatusButton from "@/components/admin/buttons/ToggleUserStatusButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    redirect("/admin"); // Only Super Admins can view this page
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-govt-text">
            Admin Users
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage system access and roles
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">Role</th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-neutral-bg/50 transition-colors ${!user.isActive ? "opacity-60" : ""}`}>
                  <td className="px-5 py-3 font-medium text-govt-text">{user.name}</td>
                  <td className="px-5 py-3 text-govt-text">{user.email}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      {user.role === "SUPER_ADMIN" && <Shield size={14} className="text-accent" />}
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md uppercase">
                        {user.role.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${user.isActive ? "text-green-600" : "text-red-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-green-600" : "bg-red-500"}`}></span>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      {session.user.id !== user.id && (
                        <ToggleUserStatusButton id={user.id} isActive={user.isActive} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
