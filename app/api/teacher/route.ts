import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { db } from "@/src/db";
import { teachersTable } from "@/src/db/schema";
import { requireRole, requireUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireUser();
    if (auth.error) return auth.error;

    const teachers = await db.select().from(teachersTable);

    return NextResponse.json(teachers);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch teachers",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(["ADMIN"]);
    if (auth.error) return auth.error;

    const body = await req.json();

    const {
      teacherCode,
      firstName,
      lastName,
      gender,
      email,
      phone,
      address,
      dateOfBirth,
      hireDate,
    } = body;

    if (!teacherCode || !firstName || !lastName || !gender || !hireDate) {
      return NextResponse.json(
        {
          message: "Required fields missing",
        },
        {
          status: 400,
        },
      );
    }

    const existingTeacher = await db
      .select()
      .from(teachersTable)
      .where(eq(teachersTable.teacherCode, teacherCode));

    if (existingTeacher.length > 0) {
      return NextResponse.json(
        {
          message: "Teacher code already exists",
        },
        {
          status: 409,
        },
      );
    }

    await db.insert(teachersTable).values({
      id: randomUUID(),
      // The teacher's own login account is linked later; the creator's id
      // must not be used here (user_id is unique per teacher).
      userId: null,

      teacherCode,

      firstName,

      lastName,

      gender,

      email,

      phone: phone ?? null,

      address: address ?? null,

      dateOfBirth: dateOfBirth ?? null,

      hireDate,

      status: "ACTIVE",
    });

    return NextResponse.json(
      {
        message: "Teacher created successfully",

        body: {
          teacherCode,
          firstName,
          lastName,
          gender,
          email,
          phone,
          address,
          dateOfBirth,
          hireDate,
        },
      },

      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create teacher",
      },

      {
        status: 500,
      },
    );
  }
}
