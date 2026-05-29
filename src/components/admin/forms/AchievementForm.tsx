"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import type { StudentAchievement } from "@prisma/client";
import { createAchievement, updateAchievement, type StudentCornerFormState } from "@/actions/admin/student-corner";

interface AchievementFormProps {
  achievement?: StudentAchievement;
  onSuccess?: () => void;
}

const initialState: StudentCornerFormState = { success: false, message: "" };

export default function AchievementForm({ achievement, onSuccess }: AchievementFormProps) {
  const router = useRouter();
  const isEditing = !!achievement;
  const boundAction = isEditing ? updateAchievement.bind(null, achievement.id) : createAchievement;
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
      <h2 className="text-xl font-bold font-heading mb-4">{isEditing ? "Edit Achievement" : "Add Achievement"}</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Student Name / Group *</label>
          <input name="studentName" defaultValue={achievement?.studentName} required className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Achievement Description *</label>
          <input name="achievement" defaultValue={achievement?.achievement} required className="w-full border rounded-lg p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input name="year" type="number" defaultValue={achievement?.year || ""} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select name="icon" defaultValue={achievement?.icon || "Trophy"} className="w-full border rounded-lg p-2 bg-white">
              <option value="Trophy">Trophy</option>
              <option value="Award">Award</option>
              <option value="Star">Star</option>
              <option value="GraduationCap">Graduation Cap</option>
              <option value="Lightbulb">Lightbulb</option>
              <option value="Leaf">Leaf</option>
              <option value="Users">Users</option>
              <option value="BookOpen">Book Open</option>
              <option value="Target">Target</option>
              <option value="Microscope">Microscope</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={isPending} className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Save size={16} /> {isPending ? "Saving..." : "Save Achievement"}
        </button>
      </form>
    </div>
  );
}
