import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { verifyToken } from "@/lib/jtw";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema";

export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
  role: Role;
};

// Reads the token cookie and loads the user from the database.
// Returns null when there is no valid session (never redirects).
export async function getSessionUser(): Promise<CurrentUser | null> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload?.id) {
    return null;
  }

  const [user] = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(and(eq(usersTable.id, payload.id), eq(usersTable.isDeleted, false)));

  return user ?? null;
}

// For pages and layouts: sends the visitor to /login when not signed in.
export async function getCurrentUser(): Promise<CurrentUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

type AuthResult =
  | { user: CurrentUser; error?: never }
  | { user?: never; error: NextResponse };

// For API routes: returns a 401 JSON response instead of redirecting.
//
//   const auth = await requireUser();
//   if (auth.error) return auth.error;
export async function requireUser(): Promise<AuthResult> {
  const user = await getSessionUser();

  if (!user) {
    return {
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user };
}

// For API routes: 401 when not signed in, 403 when the role is not allowed.
//
//   const auth = await requireRole(["ADMIN"]);
//   if (auth.error) return auth.error;
export async function requireRole(roles: Role[]): Promise<AuthResult> {
  const auth = await requireUser();

  if (auth.error) {
    return auth;
  }

  if (!roles.includes(auth.user.role)) {
    return {
      error: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    };
  }

  return auth;
}
