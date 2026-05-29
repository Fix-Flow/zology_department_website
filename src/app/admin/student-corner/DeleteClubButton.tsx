"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteClub } from "@/actions/admin/student-corner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteClubButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteClub(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={handleDelete} className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Confirm</button>
        <button onClick={() => setConfirming(false)} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">Cancel</button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete Club">
      <Trash2 size={16} />
    </button>
  );
}
