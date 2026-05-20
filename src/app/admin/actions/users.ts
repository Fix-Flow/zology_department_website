"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["SUPER_ADMIN", "FACULTY_MANAGER", "CONTENT_EDITOR", "EVENT_MANAGER"]),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "FACULTY_MANAGER", "CONTENT_EDITOR", "EVENT_MANAGER"]),
});

export type UserFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createUser(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    return { success: false, message: "Only Super Admins can create users" };
  }

  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) {
      return { success: false, message: "Email already exists", errors: { email: ["Email in use"] } };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
        role: parsed.data.role,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, message: "Failed to create user" };
  }
}

export async function updateUser(
  id: string,
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    return { success: false, message: "Only Super Admins can update users" };
  }

  const parsed = updateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing && existing.id !== id) {
      return { success: false, message: "Email already exists", errors: { email: ["Email in use"] } };
    }

    const data: any = {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
    };

    if (parsed.data.password) {
      data.password = await bcrypt.hash(parsed.data.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update user" };
  }
}

export async function toggleUserStatus(id: string, isActive: boolean): Promise<UserFormState> {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    return { success: false, message: "Unauthorized" };
  }

  // Prevent self-deactivation
  if (session.user.id === id) {
    return { success: false, message: "You cannot deactivate your own account" };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/admin/users");
    return { success: true, message: isActive ? "User activated" : "User deactivated" };
  } catch (error) {
    return { success: false, message: "Operation failed" };
  }
}
