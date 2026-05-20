import { config } from "dotenv";
config();

import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@zoology.edu";
  const password = "password123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Checking password validity...");
    
    // reset password just in case
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, isActive: true },
    });
    
    console.log("Password reset successfully.");
    console.log("Email:", email);
    console.log("Password:", password);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Super Admin created successfully!");
  console.log("Email:", email);
  console.log("Password:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
