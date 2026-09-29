import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { eq, or } from "drizzle-orm";

import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema/user";

// Public registration. The role is always STUDENT: a visitor must never be
// able to choose their own role. Admins create teachers/admins via /api/users.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const username = body?.username?.toString().trim();
    const email = body?.email?.toString().trim().toLowerCase();
    const password = body?.password?.toString();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
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

    await db.insert(usersTable).values({
      id: randomUUID(),
      username,
      email,
      password: hashedPassword,
      role: "STUDENT",
    });

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Create account failed" },
      { status: 500 },
    );
  }
}
