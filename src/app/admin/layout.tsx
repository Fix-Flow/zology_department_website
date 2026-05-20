import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Panel | Department of Zoology",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-[#f5f6fa]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-[240px] flex flex-col min-h-screen transition-all duration-300">
          <AdminTopbar />
          <main className="flex-1 p-6">{children}</main>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "8px",
              background: "#1a365d",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </div>
    </SessionProvider>
  );
}
