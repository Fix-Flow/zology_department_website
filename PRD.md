# Pre-Launch Fix PRD — GDC Zoology Department Website

> Work through these in order. Criticals block launch. Everything else should be done before go-live.

---

## 🔴 CRITICAL

---

### FIX-01 — Delete `/api/setup/route.ts`

**File:** `src/app/api/setup/route.ts`

Delete the entire file. It is a public, unauthenticated GET endpoint that:
- Creates a Super Admin with hardcoded credentials
- Returns those credentials in plaintext JSON on every request (even when users exist)

Seed your admin user locally via a one-time script or Prisma Studio before deploying. Never via a live endpoint.

---

### FIX-02 — Fix NextAuth v5 environment variable names

**File:** `.env.example` → update your actual `.env` / Vercel env vars

| Wrong (v4) | Correct (v5) |
|---|---|
| `NEXTAUTH_SECRET` | `AUTH_SECRET` |
| `NEXTAUTH_URL` | `AUTH_URL` |

Generate a proper secret:
```bash
openssl rand -base64 32
```

If your production env has the wrong names, auth is silently broken and no one can log in.

---

### FIX-03 — Wire the Neon serverless adapter in `prisma.ts`

**File:** `src/lib/prisma.ts`

`@prisma/adapter-neon` and `@neondatabase/serverless` are installed but not used. Regular TCP PrismaClient will exhaust Neon's connection limits under serverless. Replace `prisma.ts` with the Neon-adapted version:

```ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const sql = neon(process.env.DATABASE_URL!);
  const adapter = new PrismaNeon(sql);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

---

### FIX-04 — Add `directUrl` to Prisma schema

**File:** `prisma/schema.prisma`

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

`DIRECT_DATABASE_URL` is already in your `.env.example`. Without `directUrl`, `prisma migrate` and `prisma db push` fail against Neon's pooled endpoint.

---

### FIX-05 — Add RBAC to all server actions

**Files:** All files in `src/app/admin/actions/`

Every action only checks `if (!session?.user)`. The role system is defined but not enforced. Add role guards to each action based on this matrix:

| Action file | Minimum role required |
|---|---|
| `notices.ts` | `CONTENT_EDITOR` |
| `courses.ts` | `CONTENT_EDITOR` |
| `publications.ts` | `CONTENT_EDITOR` |
| `downloads.ts` | `CONTENT_EDITOR` |
| `faculty.ts` | `FACULTY_MANAGER` |
| `events.ts` | `EVENT_MANAGER` |
| `gallery.ts` | `EVENT_MANAGER` |
| `settings.ts` | `SUPER_ADMIN` only |
| `users.ts` | Already correct — `SUPER_ADMIN` only |

Pattern to use (replace the existing auth check):
```ts
const session = await auth();
const allowedRoles = ["SUPER_ADMIN", "CONTENT_EDITOR"]; // adjust per action
if (!session?.user || !allowedRoles.includes(session.user.role)) {
  return { success: false, message: "Unauthorized" };
}
```

---

### FIX-06 — Fix broken auth logic in `settings.ts`

**File:** `src/app/admin/actions/updateSettings`

The current outer `if` block doesn't `return` — the inner check is the only real guard, but the structure is misleading and will cause bugs when someone edits it. Replace entirely with:

```ts
const session = await auth();
if (!session?.user || session.user.role !== "SUPER_ADMIN") {
  return { success: false, message: "Unauthorized" };
}
```

---

## 🟠 IMPORTANT

---

### FIX-07 — Add HTTP security headers

**File:** `next.config.ts`

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // tighten once you audit inline scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://res.cloudinary.com",
      "frame-src https://www.google.com",    // for Maps embed
      "connect-src 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
```

---

### FIX-08 — Add rate limiting to admin login

**File:** `src/app/api/auth/[...nextauth]/route.ts` or middleware

Install `@upstash/ratelimit` + `@upstash/redis` (or use Vercel KV).

Add a rate limit check before auth — e.g. 5 attempts per IP per 15 minutes. Block with 429 if exceeded.

Alternatively, use a Middleware-level IP-based check on `POST /api/auth/callback/credentials`.

---

### FIX-09 — Add server-side file validation to upload action

**File:** `src/app/admin/actions/upload.ts`

The client checks 10MB but anyone calling the server action directly bypasses it. Add:

```ts
export async function uploadImageAction(dataUri: string, folder: UploadFolder) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // Validate format
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
  const mimeMatch = dataUri.match(/^data:([^;]+);base64,/);
  if (!mimeMatch || !allowedMimes.includes(mimeMatch[1])) {
    throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
  }

  // Validate size (~10MB base64 = ~13.3MB string)
  const base64Data = dataUri.split(",")[1];
  const sizeInBytes = (base64Data.length * 3) / 4;
  if (sizeInBytes > 10 * 1024 * 1024) {
    throw new Error("File too large. Maximum size is 10MB.");
  }

  return uploadToCloudinary(dataUri, folder);
}
```

Also change `resource_type: "auto"` to `resource_type: "image"` in `cloudinary.ts` for all image folders.

---

### FIX-10 — Add Zod validation to `createGalleryImage`

**File:** `src/app/admin/actions/gallery.ts`

`createGalleryImage` takes raw `src`, `alt`, `year`, `category` with no validation. Add a schema:

```ts
const gallerySchema = z.object({
  src: z.string().url("Must be a valid URL"),
  alt: z.string().min(3, "Caption must be at least 3 characters").max(200),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  category: z.enum(["EVENT", "LAB", "MUSEUM", "FIELD_VISIT", "CAMPUS"]),
});
```

---

### FIX-11 — Enforce URL-safe slug format

**Files:** `src/app/admin/actions/faculty.ts`, `events.ts`, `courses.ts`

Add a regex to slug validation in all Zod schemas:

```ts
slug: z.string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
```

---

### FIX-12 — Add error logging to all catch blocks

**Files:** All files in `src/app/admin/actions/`

Every catch block silently swallows errors. At minimum:

```ts
} catch (error) {
  console.error("[createNotice]", error);
  return { success: false, message: "Failed to create notice" };
}
```

Long-term: install Sentry (`@sentry/nextjs`) and replace `console.error` with `Sentry.captureException(error)`.

---

### FIX-13 — Add `error.tsx` error boundaries

**Locations to add `error.tsx`:**
- `src/app/error.tsx` — root level
- `src/app/admin/error.tsx` — admin section

Minimum content:
```tsx
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

### FIX-14 — Remove faculty phone numbers from public pages

**File:** `src/app/faculty/[id]/page.tsx`

The `mapped` object passes `phone` to `FacultyProfile`. Remove `phone` from the mapped object unless there's a deliberate decision to show it publicly. Similarly audit the `FacultyProfile` component and `FacultyCard` to ensure phone isn't rendered.

---

### FIX-15 — Replace `force-dynamic` with ISR on public pages

**Files:** `src/app/courses/page.tsx`, `src/app/faculty/page.tsx`, `src/app/events/page.tsx`, `src/app/downloads/page.tsx`, `src/app/faculty/[id]/page.tsx`

Replace:
```ts
export const dynamic = "force-dynamic";
```
With:
```ts
export const revalidate = 3600; // revalidate every hour
```

Keep `force-dynamic` only on `/` (homepage with live notices ticker) and all `/admin/*` pages.

---

### FIX-16 — Remove contradicting `generateStaticParams` + `force-dynamic`

**File:** `src/app/faculty/[id]/page.tsx`

Both are set simultaneously. `force-dynamic` wins and `generateStaticParams` does nothing.

**Option A (recommended):** Remove `force-dynamic`, use `revalidate = 3600`, keep `generateStaticParams` → pages are statically generated and periodically revalidated.

**Option B:** Remove `generateStaticParams`, keep `force-dynamic` → fully dynamic but no static pre-generation.

---

### FIX-17 — Pin `next-auth` to a stable version

**File:** `package.json`

```json
"next-auth": "5.0.0-beta.31"
```

Remove the `^` to pin the exact beta version. Unpinned beta dependencies will auto-update and may introduce breaking changes silently.

---

## 🟡 MINOR

---

### FIX-18 — Create the OG image

**Location:** `public/images/og-image.jpg`

Create a 1200×630px image for the department. Referenced in `src/lib/constants.ts` as `SEO.ogImage` and used in all page metadata. Currently 404s on every page share.

---

### FIX-19 — Add `sitemap.ts` and `robots.ts`

**Files to create:**
- `src/app/sitemap.ts`
- `src/app/robots.ts`

`sitemap.ts` should dynamically generate entries from DB for faculty slugs, course slugs, event slugs, plus all static routes.

`robots.ts`:
```ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
    sitemap: "https://zoology.gdcsiddipet.ac.in/sitemap.xml",
  };
}
```

---

### FIX-20 — Fix placeholder contact information

**Files:** `src/lib/constants.ts`, `src/app/contact/page.tsx`

- `HOD_PHONE`: Replace `+91-98765-43210` with the real number or remove it.
- `contact/page.tsx` line 68: Replace `ramesh.kumar@gdcsiddipet.ac.in` with the constant `HOD_EMAIL` from `constants.ts` instead of a hardcoded string.
- `GOOGLE_MAPS_EMBED_URL`: Replace fake coordinates with the real college location embed URL from Google Maps.

---

### FIX-21 — Increase minimum password length

**Files:** `src/app/admin/actions/users.ts`, `src/app/admin/users/new/UserForm.tsx`

Change minimum from 6 to 12 characters:
```ts
password: z.string().min(12, "Password must be at least 12 characters"),
```
Update the `minLength` attribute on the input to match.

---

### FIX-22 — Add max-length to all text input validations

**Files:** All action files in `src/app/admin/actions/`

Add `.max()` to all string fields to prevent oversized payloads:

```ts
title: z.string().min(3).max(300),
summary: z.string().min(10).max(5000),
alt: z.string().min(3).max(200),
// etc.
```

---

### FIX-23 — Delete dead `src/data/` files

**Files to delete:**
- `src/data/courses.ts`
- `src/data/events.ts`
- `src/data/faculty.ts`
- `src/data/downloads.ts`
- `src/data/gallery.ts`
- `src/data/notices.ts`
- `src/data/publications.ts`
- `src/data/stats.ts`

**Keep:** `src/data/navigation.ts` — still used by `Header.tsx` and `MobileNav.tsx`.

---

### FIX-24 — Remove unused dependencies

**File:** `package.json`

Remove:
- `@auth/prisma-adapter` — not used (credentials-only flow doesn't need it)

Verify then remove if unused:
- `@neondatabase/serverless` and `@prisma/adapter-neon` — only remove if you chose not to use the adapter in FIX-03 (but you should use it)

---

### FIX-25 — Replace `<img>` with `next/image` in GalleryUploadForm

**File:** `src/app/admin/gallery/new/GalleryUploadForm.tsx`

Replace the raw `<img>` (with the `eslint-disable` comment) with `next/image`. Ensure `remotePatterns` for Cloudinary is set in `next.config.ts` (covered in FIX-07).

---

### FIX-26 — Add `loading.tsx` skeleton states

**Locations:**
- `src/app/loading.tsx`
- `src/app/admin/loading.tsx`

At minimum a spinner or skeleton so pages don't flash blank content during DB fetches.

---

### FIX-27 — Fix type safety issues

**Files:** `src/app/admin/users/new/UserForm.tsx`, `src/app/admin/actions/users.ts`

- `UserForm`: Replace `user?: any` with a proper type:
  ```ts
  type UserFormProps = {
    user?: { id: string; name: string; email: string; role: Role };
  };
  ```
- `updateUser` action: Replace `const data: any = {}` with a typed object matching Prisma's `UserUpdateInput`.

---

### FIX-28 — Extract duplicate `parseCsv` utility

**Files:** `src/app/admin/actions/faculty.ts`, `courses.ts`, `publications.ts`

All three define the same `parseCsv` function. Move it to `src/lib/utils.ts` and import from there.

---

### FIX-29 — Add `select` to Prisma queries on public pages

**Files:** `src/app/events/page.tsx`, `src/app/faculty/page.tsx`, `src/app/downloads/page.tsx`

Don't fetch full rows when only a subset is displayed. Example for events list:

```ts
prisma.event.findMany({
  where: { isActive: true },
  orderBy: { date: "desc" },
  select: {
    slug: true,
    title: true,
    category: true,
    date: true,
    venue: true,
    posterImage: true,
    featured: true,
    summary: true,
  },
});
```

---

### FIX-30 — Clean up `/public` directory

**Files to delete from `/public`:**
- `next.svg`
- `vercel.svg`
- `globe.svg`
- `window.svg`
- `file.svg`

These are default Next.js template assets. Replace with department-relevant assets (logo, etc.) or leave the folder clean.

---

### FIX-31 — Update `README.md`

**File:** `README.md`

Replace the default Next.js README with project-specific documentation: setup instructions, env var list, how to seed, how to deploy, folder structure overview.

---

### FIX-32 — Remove duplicate `fileToDataUri` from `cloudinary.ts`

**File:** `src/lib/cloudinary.ts`

The `fileToDataUri` function exported from `cloudinary.ts` is never used server-side (it requires a browser `File` object). The client-side version in `GalleryUploadForm.tsx` is the one actually used. Remove it from `cloudinary.ts` to avoid confusion.

---

## ✅ Completion Checklist

| # | Fix | Severity | Done |
|---|---|---|---|
| 01 | Delete `/api/setup/route.ts` | 🔴 Critical | ☐ |
| 02 | Fix NextAuth v5 env var names | 🔴 Critical | ☐ |
| 03 | Wire Neon serverless adapter | 🔴 Critical | ☐ |
| 04 | Add `directUrl` to Prisma schema | 🔴 Critical | ☐ |
| 05 | Add RBAC to all server actions | 🔴 Critical | ☐ |
| 06 | Fix broken `settings.ts` auth logic | 🔴 Critical | ☐ |
| 07 | Add HTTP security headers | 🟠 Important | ☐ |
| 08 | Add rate limiting to admin login | 🟠 Important | ☐ |
| 09 | Server-side file validation in upload | 🟠 Important | ☐ |
| 10 | Zod validation on `createGalleryImage` | 🟠 Important | ☐ |
| 11 | Enforce URL-safe slug format | 🟠 Important | ☐ |
| 12 | Add error logging to all catch blocks | 🟠 Important | ☐ |
| 13 | Add `error.tsx` error boundaries | 🟠 Important | ☐ |
| 14 | Remove faculty phone from public pages | 🟠 Important | ☐ |
| 15 | Replace `force-dynamic` with ISR | 🟠 Important | ☐ |
| 16 | Remove conflicting `generateStaticParams` | 🟠 Important | ☐ |
| 17 | Pin `next-auth` beta version | 🟠 Important | ☐ |
| 18 | Create OG image | 🟡 Minor | ☐ |
| 19 | Add `sitemap.ts` and `robots.ts` | 🟡 Minor | ☐ |
| 20 | Fix placeholder contact info | 🟡 Minor | ☐ |
| 21 | Increase password minimum to 12 chars | 🟡 Minor | ☐ |
| 22 | Add max-length to all text validations | 🟡 Minor | ☐ |
| 23 | Delete dead `src/data/` files | 🟡 Minor | ☐ |
| 24 | Remove unused dependencies | 🟡 Minor | ☐ |
| 25 | Replace `<img>` with `next/image` | 🟡 Minor | ☐ |
| 26 | Add `loading.tsx` skeleton states | 🟡 Minor | ☐ |
| 27 | Fix type safety (`any` types) | 🟡 Minor | ☐ |
| 28 | Extract duplicate `parseCsv` to utils | 🟡 Minor | ☐ |
| 29 | Add `select` to public Prisma queries | 🟡 Minor | ☐ |
| 30 | Clean up `/public` directory | 🟡 Minor | ☐ |
| 31 | Update `README.md` | 🟡 Minor | ☐ |
| 32 | Remove duplicate `fileToDataUri` | 🟡 Minor | ☐ |
