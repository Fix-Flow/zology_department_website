import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserForm from "../../new/UserForm";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") redirect("/admin");

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) notFound();

  return <UserForm user={user} />;
}
