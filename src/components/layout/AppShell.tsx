"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <TopBar />
      <Header />
      <Breadcrumb />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}
