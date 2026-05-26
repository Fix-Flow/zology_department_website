import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/forms/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const dbSettings = await prisma.siteSetting.findMany();
  
  // Convert array of {key, value} to an object
  const settings = dbSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-govt-text">
          Site Settings
        </h1>
        <p className="text-sm text-govt-muted mt-0.5">
          Manage global website information and configurations
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
