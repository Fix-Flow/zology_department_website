import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "./EventForm";

export const dynamic = "force-dynamic";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    notFound();
  }

  return <EventForm event={event} />;
}
