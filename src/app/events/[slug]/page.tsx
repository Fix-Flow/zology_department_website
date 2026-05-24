import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User, Download, Image as ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return events.map((e) => ({ slug: e.slug }));
}

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });

  if (!event || !event.isActive) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="section-container section-padding">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-govt-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to Events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 capitalize">
              {event.category.replace("_", " ").toLowerCase()}
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-govt-text mb-6">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-govt-muted mb-8 pb-8 border-b border-govt-border">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-accent" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-accent" />
                <span>{event.venue}</span>
              </div>
            </div>

            <div className="prose prose-blue max-w-none text-govt-text leading-relaxed">
              <p className="text-lg text-govt-muted mb-6">{event.summary}</p>
              
              <p>
                The event brought together students, faculty, and experts to discuss key topics in {event.category.replace("_", " ").toLowerCase()}. 
                The session began with an inaugural address by the Head of the Department, followed by a detailed presentation. 
                Participants engaged in interactive discussions and hands-on activities where applicable.
              </p>
              <p>
                Such initiatives are part of the department&apos;s ongoing commitment to providing holistic education and exposure 
                beyond the standard curriculum, aligning with our objectives to foster research, innovation, and practical skills.
              </p>
            </div>
          </div>

          {/* Event Photos */}
          {event.photos && event.photos.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-2xl text-govt-text mb-4">Event Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {event.photos.map((photo, idx) => (
                  <div key={idx} className="aspect-video bg-neutral-bg rounded-lg border border-govt-border flex items-center justify-center relative overflow-hidden group">
                    {photo.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt={`Event photo ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-govt-muted/30" />
                    )}
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                      View Image {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Details Card */}
          <div className="card-static p-6 border-t-4 border-t-accent">
            <h3 className="font-heading font-bold text-lg mb-4">Event Details</h3>
            
            <div className="space-y-4">
              {event.resourcePerson && (
                <div>
                  <span className="block text-xs font-bold text-govt-muted uppercase tracking-wider mb-1">Resource Person</span>
                  <div className="flex items-start gap-2 text-sm text-govt-text">
                    <User size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{event.resourcePerson}</span>
                  </div>
                </div>
              )}
              
              <div>
                <span className="block text-xs font-bold text-govt-muted uppercase tracking-wider mb-1">Date</span>
                <div className="flex items-start gap-2 text-sm text-govt-text">
                  <Calendar size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-govt-muted uppercase tracking-wider mb-1">Venue</span>
                <div className="flex items-start gap-2 text-sm text-govt-text">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Downloads Card */}
          {event.reportUrl && (
            <div className="card-static p-6">
              <h3 className="font-heading font-bold text-lg mb-4">Downloads</h3>
              <a href={event.reportUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center">
                <Download size={16} />
                Event Report (PDF)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
