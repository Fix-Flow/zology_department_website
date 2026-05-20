"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.enum([
    "WORKSHOP",
    "SEMINAR",
    "GUEST_LECTURE",
    "EXHIBITION",
    "EXTENSION",
    "AWARENESS",
    "FIELD_VISIT",
  ]),
  date: z.string().min(1, "Date is required"),
  venue: z.string().min(3, "Venue must be at least 3 characters"),
  posterImage: z.string().optional(),
  reportUrl: z.string().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  resourcePerson: z.string().optional(),
  featured: z.boolean().default(false),
});

export type EventFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    date: formData.get("date"),
    venue: formData.get("venue"),
    posterImage: formData.get("posterImage") || undefined,
    reportUrl: formData.get("reportUrl") || undefined,
    summary: formData.get("summary"),
    resourcePerson: formData.get("resourcePerson") || undefined,
    featured: formData.get("featured") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if slug exists
    const existing = await prisma.event.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.event.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true, message: "Event created successfully" };
  } catch (error) {
    return { success: false, message: "Failed to create event" };
  }
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    date: formData.get("date"),
    venue: formData.get("venue"),
    posterImage: formData.get("posterImage") || undefined,
    reportUrl: formData.get("reportUrl") || undefined,
    summary: formData.get("summary"),
    resourcePerson: formData.get("resourcePerson") || undefined,
    featured: formData.get("featured") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if slug exists and belongs to another event
    const existing = await prisma.event.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing && existing.id !== id) {
      return {
        success: false,
        message: "Slug already exists. Please choose a unique slug.",
        errors: { slug: ["Slug already in use"] },
      };
    }

    await prisma.event.update({
      where: { id },
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath(`/events/${parsed.data.slug}`);
    revalidatePath("/admin/events");
    return { success: true, message: "Event updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update event" };
  }
}

export async function deleteEvent(id: string): Promise<EventFormState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.event.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true, message: "Event deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete event" };
  }
}
