import { prisma } from "@/lib/prisma";
import ClubForm from "@/components/admin/forms/ClubForm";
import AchievementForm from "@/components/admin/forms/AchievementForm";
import AdminModal from "@/components/admin/AdminModal";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteClubButton from "./DeleteClubButton";
import DeleteAchievementButton from "./DeleteAchievementButton";

type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };

export const dynamic = "force-dynamic";

export default async function StudentCornerAdminPage(props: PageProps) {
  const searchParams = await props.searchParams;
  
  const clubs = await prisma.studentClub.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } });
  const achievements = await prisma.studentAchievement.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });

  const newClub = searchParams.newClub === "true";
  const newAchievement = searchParams.newAchievement === "true";
  const editClubId = searchParams.editClub;
  const editAchievementId = searchParams.editAchievement;

  let editClub = null;
  if (editClubId) editClub = await prisma.studentClub.findUnique({ where: { id: editClubId } });
  
  let editAchievement = null;
  if (editAchievementId) editAchievement = await prisma.studentAchievement.findUnique({ where: { id: editAchievementId } });

  return (
    <div className="space-y-10 w-full">
      <div>
        <h1 className="font-heading text-2xl font-bold text-govt-text">Student Corner</h1>
        <p className="text-sm text-govt-muted mt-1">Manage Student Clubs and Achievements shown on the public dashboard.</p>
      </div>

      {/* CLUBS SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Student Clubs & Forums</h2>
          <Link href="?newClub=true" className="bg-primary text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"><Plus size={16} /> Add Club</Link>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-bg border-b">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{club.name}</td>
                  <td className="px-4 py-3 text-gray-500">{club.icon}</td>
                  <td className="px-4 py-3 flex justify-end gap-2">
                    <Link href={`?editClub=${club.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></Link>
                    <DeleteClubButton id={club.id} />
                  </td>
                </tr>
              ))}
              {clubs.length === 0 && (
                <tr><td colSpan={3} className="text-center py-6 text-gray-500">No clubs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Recent Achievements</h2>
          <Link href="?newAchievement=true" className="bg-primary text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"><Plus size={16} /> Add Achievement</Link>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-bg border-b">
              <tr>
                <th className="px-4 py-3">Student/Group</th>
                <th className="px-4 py-3">Achievement</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {achievements.map((ach) => (
                <tr key={ach.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{ach.studentName}</td>
                  <td className="px-4 py-3 text-gray-600">{ach.achievement}</td>
                  <td className="px-4 py-3 flex justify-end gap-2">
                    <Link href={`?editAchievement=${ach.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></Link>
                    <DeleteAchievementButton id={ach.id} />
                  </td>
                </tr>
              ))}
              {achievements.length === 0 && (
                <tr><td colSpan={3} className="text-center py-6 text-gray-500">No achievements found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODALS */}
      {newClub && <AdminModal returnTo="/admin/student-corner"><ClubForm /></AdminModal>}
      {editClub && <AdminModal returnTo="/admin/student-corner"><ClubForm club={editClub} /></AdminModal>}
      {newAchievement && <AdminModal returnTo="/admin/student-corner"><AchievementForm /></AdminModal>}
      {editAchievement && <AdminModal returnTo="/admin/student-corner"><AchievementForm achievement={editAchievement} /></AdminModal>}
    </div>
  );
}
