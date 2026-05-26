"use client";


import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Header />
      <Breadcrumb />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}
