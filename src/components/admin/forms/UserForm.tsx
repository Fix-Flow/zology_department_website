"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { createUser, updateUser, type UserFormState } from "@/actions/admin/users";

const roles = [
  { value: "SUPER_ADMIN", label: "Super Admin (Full Access)" },
  { value: "FACULTY_MANAGER", label: "Faculty Manager" },
  { value: "CONTENT_EDITOR", label: "Content Editor (Notices, Courses, etc.)" },
  { value: "EVENT_MANAGER", label: "Event Manager (Events & Gallery)" },
];

const initialState: UserFormState = {
  success: false,
  message: "",
};

import type { Role } from "@prisma/client";


type UserFormProps = {
  user?: { id: string; name: string; email: string; role: Role };
};

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const isEditing = !!user;

  const boundAction = isEditing ? updateUser.bind(null, user.id) : createUser;
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/users");
      router.refresh();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div data-component="UserForm" className="max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Users
        </Link>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          {isEditing ? "Edit User" : "Add New User"}
        </h1>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="bg-white rounded-xl border border-govt-border p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-govt-text mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                defaultValue={user?.name || ""}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-govt-text mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                required
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-govt-text mb-1.5">
                Password {isEditing ? <span className="text-govt-muted font-normal">(Leave blank to keep current)</span> : <span className="text-red-500">*</span>}
              </label>
              <input
                name="password"
                type="password"
                required={!isEditing}
                minLength={12}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {state.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-govt-text mb-1.5">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                defaultValue={user?.role || "CONTENT_EDITOR"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
          >
            {isPending ? "Saving..." : (
              <>
                <Save size={16} />
                {isEditing ? "Update User" : "Create User"}
              </>
            )}
          </button>
          <Link href="/admin/users" className="px-6 py-2.5 border border-govt-border rounded-lg text-sm font-medium text-govt-muted hover:bg-neutral-bg transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
