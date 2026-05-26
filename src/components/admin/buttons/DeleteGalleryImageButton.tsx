"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteGalleryImage } from "@/actions/admin/gallery";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteGalleryImageButton({
  id,
}: {
  id: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteGalleryImage(id);
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
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg flex items-center gap-1 shadow-sm">
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
      className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm hover:bg-red-50 text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
      title="Delete Image"
    >
      <Trash2 size={16} />
    </button>
  );
}
