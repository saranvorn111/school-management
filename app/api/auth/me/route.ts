import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema/user";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/jtw";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, payload.id));

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
