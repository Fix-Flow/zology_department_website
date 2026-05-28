import PageHero from "@/components/ui/PageHero";
import EventCard from "@/components/events/EventCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import type { Event } from "@/types/event";


export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Department Events & Activities",
  description:
    "Seminars, workshops, field visits, and other academic events organized by the Department of Zoology.",
};

export default async function EventsPage() {
  const dbEvents = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
    select: {
      slug: true,
      title: true,
      category: true,
      date: true,
      venue: true,
      posterImage: true,
      reportUrl: true,
      photos: true,
      summary: true,
      resourcePerson: true,
      featured: true,
    },
  });

  // Map DB fields to the shape EventCard expects
  const sortedEvents = dbEvents.map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category.toLowerCase().replace("_", "-") as Event["category"],
    date: e.date.toISOString(),
    venue: e.venue,
    posterImage: e.posterImage || undefined,
    reportUrl: e.reportUrl || undefined,
    photos: e.photos,
    summary: e.summary,
    resourcePerson: e.resourcePerson || undefined,
    featured: e.featured,
  }));

  return (
    <>
      <PageHero
        title="Events & Activities"
        subtitle="Discover our seminars, workshops, extension activities, and field visits."
      />

      <div data-component="Events_page" className="section-container section-padding">
        {sortedEvents.length === 0 ? (
          <p className="text-center text-govt-muted py-12">
            No events have been posted yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
