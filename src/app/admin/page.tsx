import {
  Bell,
  Calendar,
  Users,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Download,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const [
    noticeCount,
    eventCount,
    facultyCount,
    courseCount,
    publicationCount,
    galleryCount,
    downloadCount,
    userCount,
  ] = await Promise.all([
    prisma.notice.count({ where: { isActive: true } }),
    prisma.event.count({ where: { isActive: true } }),
    prisma.faculty.count({ where: { isActive: true } }),
    prisma.course.count({ where: { isActive: true } }),
    prisma.publication.count({ where: { isActive: true } }),
    prisma.galleryImage.count({ where: { isActive: true } }),
    prisma.download.count({ where: { isActive: true } }),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  return {
    noticeCount,
    eventCount,
    facultyCount,
    courseCount,
    publicationCount,
    galleryCount,
    downloadCount,
    userCount,
  };
}

async function getRecentActivity() {
  const [recentNotices, recentEvents] = await Promise.all([
    prisma.notice.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, category: true, createdAt: true },
    }),
    prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, category: true, createdAt: true },
    }),
  ]);

  return { recentNotices, recentEvents };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const { recentNotices, recentEvents } = await getRecentActivity();

  const statCards = [
    {
      label: "Notices",
      value: stats.noticeCount,
      icon: Bell,
      href: "/admin/notices",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Events",
      value: stats.eventCount,
      icon: Calendar,
      href: "/admin/events",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Faculty",
      value: stats.facultyCount,
      icon: Users,
      href: "/admin/faculty",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Courses",
      value: stats.courseCount,
      icon: BookOpen,
      href: "/admin/courses",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Publications",
      value: stats.publicationCount,
      icon: FileText,
      href: "/admin/publications",
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Gallery Images",
      value: stats.galleryCount,
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "bg-teal-50 text-teal-600",
    },
    {
      label: "Downloads",
      value: stats.downloadCount,
      icon: Download,
      href: "/admin/downloads",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Admin Users",
      value: stats.userCount,
      icon: TrendingUp,
      href: "/admin/users",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const quickActions = [
    { label: "Add Notice", href: "/admin/notices/new", icon: Bell },
    { label: "Add Event", href: "/admin/events/new", icon: Calendar },
    { label: "Add Faculty", href: "/admin/faculty/new", icon: Users },
    { label: "Upload Gallery", href: "/admin/gallery/new", icon: ImageIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-govt-text">
            Dashboard
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Overview of all department content and recent activity
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-govt-border p-5 hover:shadow-card transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-govt-muted uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-heading font-bold text-govt-text mt-2">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-govt-border p-6">
        <h2 className="font-heading font-bold text-lg text-govt-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2.5 px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-lg text-sm font-medium text-primary transition-colors justify-center sm:justify-start"
            >
              <Plus size={16} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Notices */}
        <div className="bg-white rounded-xl border border-govt-border">
          <div className="p-5 border-b border-govt-border flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-govt-text">
              Recent Notices
            </h2>
            <Link
              href="/admin/notices"
              className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-govt-border">
            {recentNotices.length === 0 ? (
              <div className="p-5 text-sm text-govt-muted text-center">
                No notices yet.{" "}
                <Link href="/admin/notices/new" className="text-primary hover:underline">
                  Create one
                </Link>
              </div>
            ) : (
              recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 flex items-center justify-between hover:bg-neutral-bg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-govt-text line-clamp-1">
                      {notice.title}
                    </p>
                    <p className="text-xs text-govt-muted mt-0.5">
                      {new Date(notice.createdAt).toLocaleDateString("en-IN")}
                      {" · "}
                      <span className="capitalize">
                        {notice.category.toLowerCase().replace("_", " ")}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl border border-govt-border">
          <div className="p-5 border-b border-govt-border flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-govt-text">
              Recent Events
            </h2>
            <Link
              href="/admin/events"
              className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-govt-border">
            {recentEvents.length === 0 ? (
              <div className="p-5 text-sm text-govt-muted text-center">
                No events yet.{" "}
                <Link href="/admin/events/new" className="text-primary hover:underline">
                  Create one
                </Link>
              </div>
            ) : (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 flex items-center justify-between hover:bg-neutral-bg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-govt-text line-clamp-1">
                      {event.title}
                    </p>
                    <p className="text-xs text-govt-muted mt-0.5">
                      {new Date(event.createdAt).toLocaleDateString("en-IN")}
                      {" · "}
                      <span className="capitalize">
                        {event.category.toLowerCase().replace("_", " ")}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
