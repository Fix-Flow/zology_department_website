"use client";

import { useActionState, useEffect, useState } from "react";
import { Save, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { updateSettings, type SettingsFormState } from "@/actions/admin/settings";
import { uploadImageAction } from "@/actions/admin/upload";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

const initialState: SettingsFormState = {
  success: false,
  message: "",
};

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [state, formAction, isPending] = useActionState(updateSettings, initialState);
  
  const [hodPhoto, setHodPhoto] = useState(settings.HOD_PHOTO || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const dataUri = await fileToDataUri(file);
      const { url } = await uploadImageAction(dataUri, "faculty"); // using faculty folder for HOD photo
      setHodPhoto(url);
      toast.success("HOD photo uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-8 max-w-4xl">
      {/* HOD Details Section */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="px-6 py-4 border-b border-govt-border bg-neutral-bg/50">
          <h2 className="font-heading font-bold text-lg text-govt-text">Head of Department (HOD) Details</h2>
          <p className="text-sm text-govt-muted">Information displayed on the HOD Message section</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-govt-text mb-1.5">HOD Photo</label>
              <input type="hidden" name="HOD_PHOTO" value={hodPhoto} />
              
              <div className="flex flex-col gap-3">
                {hodPhoto ? (
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-govt-border group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hodPhoto} alt="HOD Photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setHodPhoto("")}
                        className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-xl border-2 border-dashed border-govt-border flex flex-col items-center justify-center bg-neutral-bg">
                    <Upload size={24} className="text-govt-muted mb-2" />
                    <span className="text-sm text-govt-muted">Upload Photo</span>
                  </div>
                )}
                
                <div>
                  <input
                    type="file"
                    id="hodPhotoUpload"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="hodPhotoUpload"
                    className={`inline-flex items-center gap-2 px-4 py-2 border border-govt-border rounded-lg text-sm font-medium cursor-pointer hover:bg-neutral-bg transition-colors ${
                      isUploading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Choose Photo"}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <label htmlFor="HOD_NAME" className="block text-sm font-medium text-govt-text mb-1.5">
                  HOD Name
                </label>
                <input
                  id="HOD_NAME"
                  name="HOD_NAME"
                  type="text"
                  defaultValue={settings.HOD_NAME || ""}
                  className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Dr. John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="HOD_MESSAGE" className="block text-sm font-medium text-govt-text mb-1.5">
                  HOD Message
                </label>
                <textarea
                  id="HOD_MESSAGE"
                  name="HOD_MESSAGE"
                  rows={6}
                  defaultValue={settings.HOD_MESSAGE || ""}
                  className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                  placeholder="Welcome message from the Head of Department..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="px-6 py-4 border-b border-govt-border bg-neutral-bg/50">
          <h2 className="font-heading font-bold text-lg text-govt-text">Department Statistics</h2>
          <p className="text-sm text-govt-muted">Numbers displayed on the home page</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="STATS_STUDENTS" className="block text-sm font-medium text-govt-text mb-1.5">
                Total Students
              </label>
              <input
                id="STATS_STUDENTS"
                name="STATS_STUDENTS"
                type="number"
                defaultValue={settings.STATS_STUDENTS || "0"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="STATS_FACULTY" className="block text-sm font-medium text-govt-text mb-1.5">
                Faculty Members
              </label>
              <input
                id="STATS_FACULTY"
                name="STATS_FACULTY"
                type="number"
                defaultValue={settings.STATS_FACULTY || "0"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="STATS_ALUMNI" className="block text-sm font-medium text-govt-text mb-1.5">
                Alumni Network
              </label>
              <input
                id="STATS_ALUMNI"
                name="STATS_ALUMNI"
                type="number"
                defaultValue={settings.STATS_ALUMNI || "0"}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="px-6 py-4 border-b border-govt-border bg-neutral-bg/50">
          <h2 className="font-heading font-bold text-lg text-govt-text">Contact Information</h2>
          <p className="text-sm text-govt-muted">Displayed in the footer and contact page</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="CONTACT_EMAIL" className="block text-sm font-medium text-govt-text mb-1.5">
                Contact Email
              </label>
              <input
                id="CONTACT_EMAIL"
                name="CONTACT_EMAIL"
                type="email"
                defaultValue={settings.CONTACT_EMAIL || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="CONTACT_PHONE" className="block text-sm font-medium text-govt-text mb-1.5">
                Contact Phone
              </label>
              <input
                id="CONTACT_PHONE"
                name="CONTACT_PHONE"
                type="text"
                defaultValue={settings.CONTACT_PHONE || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="CONTACT_ADDRESS" className="block text-sm font-medium text-govt-text mb-1.5">
                Physical Address
              </label>
              <textarea
                id="CONTACT_ADDRESS"
                name="CONTACT_ADDRESS"
                rows={3}
                defaultValue={settings.CONTACT_ADDRESS || ""}
                className="w-full px-4 py-2.5 border border-govt-border rounded-lg text-sm text-govt-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving Changes..." : (
            <>
              <Save size={18} />
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}
