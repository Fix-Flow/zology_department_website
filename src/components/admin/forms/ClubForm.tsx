"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import type { StudentClub } from "@prisma/client";
import { createClub, updateClub, type StudentCornerFormState } from "@/actions/admin/student-corner";

interface ClubFormProps {
  club?: StudentClub;
  onSuccess?: () => void;
}

const initialState: StudentCornerFormState = { success: false, message: "" };

export default function ClubForm({ club, onSuccess }: ClubFormProps) {
  const router = useRouter();
  const isEditing = !!club;
  const boundAction = isEditing ? updateClub.bind(null, club.id) : createClub;
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      if (onSuccess) onSuccess();
      router.push('/admin/student-corner');
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, onSuccess]);

  return (
    <div className="max-w-2xl bg-white rounded-xl p-6 border border-govt-border">
      <h2 className="text-xl font-bold font-heading mb-4">{isEditing ? "Edit Club" : "Add New Club"}</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Club Name *</label>
          <input name="name" defaultValue={club?.name} required className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea name="description" defaultValue={club?.description} required rows={3} className="w-full border rounded-lg p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select name="icon" defaultValue={club?.icon || "Lightbulb"} className="w-full border rounded-lg p-2 bg-white">
              <option value="Lightbulb">Lightbulb</option>
              <option value="Leaf">Leaf</option>
              <option value="Users">Users</option>
              <option value="BookOpen">Book Open</option>
              <option value="Trophy">Trophy</option>
              <option value="Award">Award</option>
              <option value="Star">Star</option>
              <option value="GraduationCap">Graduation Cap</option>
              <option value="Target">Target</option>
              <option value="Microscope">Microscope</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <input name="displayOrder" type="number" defaultValue={club?.displayOrder || 0} className="w-full border rounded-lg p-2" />
          </div>
        </div>
        <button type="submit" disabled={isPending} className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Save size={16} /> {isPending ? "Saving..." : "Save Club"}
        </button>
      </form>
    </div>
  );
}
