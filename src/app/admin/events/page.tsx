import Link from "next/link";
import { Plus, Calendar, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteEventButton from "@/components/admin/buttons/DeleteEventButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-govt-text">
            Events & Activities
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage department workshops, seminars, and field visits
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          Add Event
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-govt-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-bg border-b border-govt-border">
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Title
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Category
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Date
                </th>
                <th className="text-left px-5 py-3 font-semibold text-govt-text">
                  Venue
                </th>
                <th className="text-right px-5 py-3 font-semibold text-govt-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govt-border">
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-govt-muted"
                  >
                    <Calendar
                      size={32}
                      className="mx-auto mb-3 text-govt-muted/40"
                    />
                    <p>No events found.</p>
                    <Link
                      href="/admin/events/new"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Create your first event
                    </Link>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-neutral-bg/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {event.featured && (
                          <span title="Featured Event">
                            <Star
                              size={12}
                              className="text-accent fill-accent shrink-0"
                            />
                          </span>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-govt-text line-clamp-1">
                            {event.title}
                          </span>
                          <span className="text-xs text-govt-muted mt-0.5">
                            /{event.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md capitalize">
                        {event.category.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-govt-muted">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-govt-text line-clamp-1">
                      {event.venue}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteEventButton id={event.id} title={event.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
