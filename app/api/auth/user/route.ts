import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema/user";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password, role } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.insert(usersTable).values({
      id: randomUUID(),
      username,
      email,
      password: hashedPassword,
      role: role ?? "STUDENT",
    });

    return NextResponse.json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Create user failed",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
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
