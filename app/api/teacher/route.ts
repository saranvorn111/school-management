import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { db } from "@/src/db";
import { teachersTable } from "@/src/db/schema";
import { verifyToken } from "@/lib/jtw";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
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
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        {
          status: 401,
        },
      );
    }

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
      userId: decoded.id,

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
