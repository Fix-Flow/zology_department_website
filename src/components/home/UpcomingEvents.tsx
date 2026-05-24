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
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            title="Events & Activities"
            subtitle="Workshops, seminars, guest lectures, and more"
            className="!mb-0"
          />
          <Link
            href="/events"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0"
          >
            View All Events
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="card group overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarDays size={48} className="text-primary/15" />
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge-category capitalize">
                    {event.category.replace("_", " ").toLowerCase()}
                  </span>
                </div>

                {/* Date badge */}
                <div className="absolute top-3 right-3 bg-white rounded-lg px-2.5 py-1.5 shadow-sm text-center">
                  <span className="block text-xs font-bold text-primary leading-none">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                    })}
                  </span>
                  <span className="block text-[10px] text-govt-muted uppercase mt-0.5">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-body font-semibold text-card-title text-govt-text group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {event.title}
                </h3>

                <div className="mt-2.5 flex items-center gap-1.5 text-govt-muted">
                  <MapPin size={13} className="shrink-0" />
                  <span className="text-xs truncate">{event.venue}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-govt-muted">
                  <CalendarDays size={13} className="shrink-0" />
                  <span className="text-xs">{formatDate(event.date.toISOString())}</span>
                </div>

                <p className="mt-3 text-sm text-govt-muted leading-relaxed line-clamp-2">
                  {event.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-6 text-center sm:hidden">
          <Link href="/events" className="btn-outline text-sm">
            View All Events
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
