import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jtw";

// Optimistic check only: it reads the cookie and verifies the JWT, without
// touching the database. Real permission checks still happen in every page
// (getCurrentUser) and API route (requireUser / requireRole).
export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const session = token ? verifyToken(token) : null;

  if (!session) {
    const res = NextResponse.redirect(new URL("/login", req.nextUrl));
    // Remove an expired or tampered cookie.
    if (token) res.cookies.delete("token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
