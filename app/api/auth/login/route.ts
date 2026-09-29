import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema/user";
import { generateToken } from "@/lib/jtw";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    const user = users[0];

    // Same message for "no such user" and "wrong password" so the login form
    // cannot be used to discover which emails are registered.
    const passwordMatch =
      user && !user.isDeleted
        ? await bcrypt.compare(password, user.password)
        : false;

    if (!user || !passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
