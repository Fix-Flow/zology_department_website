import HeroSection from "@/components/home/HeroSection";
import AnnouncementTicker from "@/components/home/AnnouncementTicker";
import StatsBar from "@/components/home/StatsBar";
import HodMessage from "@/components/home/HodMessage";
import QuickLinks from "@/components/home/QuickLinks";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewsNotices from "@/components/home/NewsNotices";
import GalleryPreview from "@/components/home/GalleryPreview";

export const revalidate = 60; // Cache revalidates every 60 seconds

export default function HomePage() {
  return (
    <>
      {/* 1. Announcement Ticker */}
      <AnnouncementTicker />

      {/* 2. Hero Banner */}
      <HeroSection />

      {/* 3. Stats Bar — animated counters */}
      <StatsBar />

      {/* 4. HoD Welcome Message */}
      <HodMessage />

      {/* 5. Quick Links — icon card grid */}
      <QuickLinks />

      {/* 6. Upcoming Events — 3-card preview */}
      <UpcomingEvents />

      {/* 7. News & Notices — highlights + notice board */}
      <NewsNotices />

      {/* 8. Gallery Preview — masonry grid */}
      <GalleryPreview />
    </>
  );
}
