import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";


export default async function UpcomingEvents() {
  const featuredEvents = await prisma.event.findMany({
    where: { featured: true, isActive: true },
    orderBy: { date: "desc" },
    take: 3,
  });

  if (featuredEvents.length === 0) return null;

  return (
    <section data-component="UpcomingEvents" className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            title="Events & Activities"
            subtitle="Workshops, seminars, guest lectures, and more"
            className="!mb-0"
          />
          <Link
            href="/events"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0 group"
          >
            View All Events
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="card group overflow-hidden"
            >
              {/* Image placeholder with hover zoom */}
              <div className="h-48 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <CalendarDays size={48} className="text-primary/10" />
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="badge-category capitalize">
                    {event.category.replace("_", " ").toLowerCase()}
                  </span>
                </div>

                {/* Date badge — premium */}
                <div className="absolute top-3 right-3 z-10 bg-white rounded-lg px-3 py-2 shadow-md text-center min-w-[52px]">
                  <span className="block text-lg font-bold text-primary leading-none">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                    })}
                  </span>
                  <span className="block text-[10px] text-govt-muted uppercase mt-1 font-semibold">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Content — better spacing */}
              <div className="p-5">
                <h3 className="font-body font-semibold text-card-title text-govt-text group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {event.title}
                </h3>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-govt-muted">
                    <MapPin size={14} className="shrink-0 text-primary/40" />
                    <span className="text-xs truncate">{event.venue}</span>
                  </div>

                  <div className="flex items-center gap-2 text-govt-muted">
                    <CalendarDays size={14} className="shrink-0 text-primary/40" />
                    <span className="text-xs">{formatDate(event.date.toISOString())}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-govt-muted leading-relaxed line-clamp-2">
                  {event.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/events" className="btn-outline text-sm">
            View All Events
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
