"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteNotice } from "../actions/notices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteNoticeButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteNotice(id);
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
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
      title={`Delete "${title}"`}
    >
      <Trash2 size={14} />
    </button>
  );
}
