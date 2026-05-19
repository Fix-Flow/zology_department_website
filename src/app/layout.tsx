import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";

const merriweather = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Department of Zoology | GDC Autonomous Siddipet",
    template: "%s | Zoology Dept | GDC Autonomous Siddipet",
  },
  description:
    "Official website of the Department of Zoology, Government Degree College (Autonomous), Siddipet, Telangana. Explore courses, faculty, research, and admissions.",
  keywords: [
    "Zoology",
    "GDC Siddipet",
    "Government Degree College",
    "Siddipet",
    "Telangana",
    "B.Sc Zoology",
    "M.Sc Zoology",
    "NAAC Accredited",
  ],
  authors: [{ name: "Department of Zoology, GDC Autonomous Siddipet" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Department of Zoology - GDC Autonomous Siddipet",
    title: "Department of Zoology | GDC Autonomous Siddipet",
    description:
      "Official website of the Department of Zoology, Government Degree College (Autonomous), Siddipet, Telangana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased">
        {/* Skip to content — Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Top Bar: phone, email, social */}
        <TopBar />

        {/* Sticky Header: logo + navigation */}
        <Header />

        {/* Breadcrumb navigation (hidden on home) */}
        <Breadcrumb />

        {/* Main content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
