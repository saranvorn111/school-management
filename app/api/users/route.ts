import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema/user";
import { randomUUID } from "crypto";
import { eq, or } from "drizzle-orm";
import { requireRole } from "@/lib/auth";

const ROLES = ["ADMIN", "TEACHER", "STUDENT"] as const;

// Admin-only: create a user with any role.
// Public registration lives in /api/auth/signup and always creates a STUDENT.
export async function POST(req: Request) {
  try {
    const auth = await requireRole(["ADMIN"]);
    if (auth.error) return auth.error;

    const body = await req.json();

    const { username, email, password, role } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email and password are required" },
        { status: 400 },
      );
    }

    if (role && !ROLES.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(or(eq(usersTable.email, email), eq(usersTable.username, username)));

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = randomUUID();

    await db.insert(usersTable).values({
      id,
      username,
      email,
      password: hashedPassword,
      role: role ?? "STUDENT",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        data: { id, username, email, role: role ?? "STUDENT" },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Create user failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const auth = await requireRole(["ADMIN"]);
  if (auth.error) return auth.error;

  const users = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable);

  return NextResponse.json(users);
}
