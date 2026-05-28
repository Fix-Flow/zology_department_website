"use client";

import { useState } from "react";
import { toggleUserStatus } from "@/actions/admin/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ToggleUserStatusButton({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const result = await toggleUserStatus(id, !isActive);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <button data-component="ToggleUserStatusButton"
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
        isActive
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-green-50 text-green-600 hover:bg-green-100"
      }`}
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}
