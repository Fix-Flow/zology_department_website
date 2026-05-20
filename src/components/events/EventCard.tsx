import Link from "next/link";
import { Calendar, MapPin, User, ArrowRight } from "lucide-react";
import { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {
  // Format the date nicely
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();

  return (
    <div className="card group flex flex-col h-full overflow-hidden">
      {/* Header/Image Area */}
      <div className="h-48 bg-neutral-bg relative overflow-hidden flex-shrink-0">
        {/* Placeholder if no image */}
        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
          <Calendar size={48} className="text-primary/20" />
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white shadow-sm rounded-lg flex flex-col items-center justify-center w-14 h-14 border border-govt-border z-10">
          <span className="text-xs font-bold text-accent uppercase">{month}</span>
          <span className="text-xl font-heading font-bold text-govt-text leading-none">{day}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="badge-category capitalize">
            {event.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-body font-semibold text-card-title text-govt-text group-hover:text-primary transition-colors leading-snug mb-3">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-govt-muted">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          {event.resourcePerson && (
            <div className="flex items-start gap-2">
              <User size={14} className="text-accent shrink-0 mt-0.5" />
              <span className="line-clamp-1">{event.resourcePerson}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-govt-muted line-clamp-3 mb-5">
          {event.summary}
        </p>

        {/* Action Link */}
        <div className="mt-auto pt-4 border-t border-govt-border">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors"
          >
            Read More
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
