import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { verifyToken } from "@/lib/jtw";
import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema";

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = verifyToken(token);

    if (!payload || !payload.id) {
      redirect("/login");
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, payload.id));

    if (!user) {
      redirect("/login");
    }

    return user;
  } catch {
    redirect("/login");
  }
}
