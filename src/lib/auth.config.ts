import type { NextAuthConfig } from "next-auth";
import { hasPermission } from "@/lib/rbac";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Add providers in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/login";

      if (isAdminRoute && !isLoginPage) {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/login", nextUrl));
        }
        
        if (!hasPermission(auth?.user?.role, nextUrl.pathname)) {
          // If trying to access a restricted section, redirect to the main admin dashboard
          // which is available to all authenticated roles
          return Response.redirect(new URL("/admin", nextUrl));
        }
      }

      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
