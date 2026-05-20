import { SessionProvider } from "next-auth/react";
import AdminShell from "@/components/admin/AdminShell";
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
      <AdminShell>{children}</AdminShell>
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
    </SessionProvider>
  );
}
