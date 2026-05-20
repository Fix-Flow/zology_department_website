"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Shield } from "lucide-react";
import { useState } from "react";

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  FACULTY_MANAGER: "Faculty Manager",
  CONTENT_EDITOR: "Content Editor",
  EVENT_MANAGER: "Event Manager",
};

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-red-50 text-red-700 border-red-200",
  FACULTY_MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
  CONTENT_EDITOR: "bg-green-50 text-green-700 border-green-200",
  EVENT_MANAGER: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function AdminTopbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const role = session?.user?.role || "CONTENT_EDITOR";

  return (
    <header className="h-16 bg-white border-b border-govt-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div>
        <h2 className="text-sm font-heading font-bold text-govt-text">
          Department of Zoology — Admin
        </h2>
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 text-sm hover:bg-neutral-bg px-3 py-2 rounded-lg transition-colors"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={16} />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-medium text-govt-text text-xs leading-tight">
              {session?.user?.name || "Admin"}
            </p>
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${roleColors[role]}`}
            >
              <Shield size={8} />
              {roleLabels[role]}
            </span>
          </div>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-govt-border py-1 z-50">
              <div className="px-3 py-2 border-b border-govt-border">
                <p className="text-xs font-medium text-govt-text truncate">
                  {session?.user?.email}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
