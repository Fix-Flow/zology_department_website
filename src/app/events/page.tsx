import PageHero from "@/components/ui/PageHero";
import EventCard from "@/components/events/EventCard";
import { events } from "@/data/events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Department Events & Activities",
  description:
    "Seminars, workshops, field visits, and other academic events organized by the Department of Zoology.",
};

export default function EventsPage() {
  // Sort events by date descending
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        title="Events & Activities"
        subtitle="Discover our seminars, workshops, extension activities, and field visits."
      />

      <div className="section-container section-padding">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
