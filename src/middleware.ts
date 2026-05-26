import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Simple in-memory sliding window rate limiter
// Key: IP address, Value: Array of timestamps for login attempts
const rateLimitMap = new Map<string, number[]>();

const LIMIT = 5; // Maximum attempts
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

export default auth(async function middleware(req) {
  const { nextUrl, method } = req;
  const ip = (req as any).ip || req.headers.get("x-forwarded-for") || "127.0.0.1";

  // Check if it's the credentials callback POST request (sign-in submission)
  if (
    method === "POST" &&
    nextUrl.pathname === "/api/auth/callback/credentials"
  ) {
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];

    // Filter out timestamps older than the 15-minute window
    const recentTimestamps = timestamps.filter(
      (time) => now - time < WINDOW_MS
    );

    if (recentTimestamps.length >= LIMIT) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Too many login attempts. Please try again in 15 minutes.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Prevent memory leak by bounding the Map size
    if (rateLimitMap.size > 10000) {
      // Clear the map if it grows too large (fallback for serverless memory persistence)
      rateLimitMap.clear();
      console.warn("[SECURITY] Rate limit map cleared due to size limit. Use Redis for production.");
    }

    // Record the current login attempt timestamp
    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/auth/callback/credentials"],
};
