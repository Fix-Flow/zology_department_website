import { Role } from "@prisma/client";

export const ROLE_PERMISSIONS = {
  // Routes accessible by each role
  // /admin represents the dashboard root
  [Role.SUPER_ADMIN]: ["*"], // Wildcard for all routes
  [Role.FACULTY_MANAGER]: ["/admin", "/admin/faculty"],
  [Role.EVENT_MANAGER]: ["/admin", "/admin/events", "/admin/gallery", "/admin/notices"],
  [Role.CONTENT_EDITOR]: [
    "/admin",
    "/admin/courses",
    "/admin/publications",
    "/admin/downloads",
    "/admin/notices",
    "/admin/student-corner",
  ],
};

export function hasPermission(role: Role | undefined, path: string): boolean {
  if (!role) return false;

  const allowedRoutes = ROLE_PERMISSIONS[role];
  if (!allowedRoutes) return false;

  // SUPER_ADMIN has access to everything
  if (allowedRoutes.includes("*")) return true;

  // Check if the current path is allowed
  // For example, if path is /admin/events/new, it should be allowed if /admin/events is in allowedRoutes
  return allowedRoutes.some((route) => {
    // Exact match for the root dashboard
    if (route === "/admin" && path === "/admin") return true;

    // Prefix match for sub-routes (e.g., /admin/events allows /admin/events, /admin/events/new)
    if (route !== "/admin" && path.startsWith(route)) return true;

    return false;
  });
}
