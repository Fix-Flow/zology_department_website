import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const adminEmail = "admin@zoology.edu";
    const adminPassword = "password123";

    const existingUsers = await prisma.user.count();

    if (existingUsers > 0) {
      return NextResponse.json({
        message: "Users already exist. Setup skipped.",
        demoData: {
          email: adminEmail,
          password: adminPassword,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({
      message: "Initial Super Admin user created successfully!",
      demoData: {
        email: adminEmail,
        password: adminPassword,
      },
      instruction: "Go to /admin/login to sign in.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Setup failed", details: error.message },
      { status: 500 }
    );
  }
}
