import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { db } from "@/src/db";
import { studentsTable } from "@/src/db/schema";
import { verifyToken } from "@/lib/jtw";
import { eq } from "drizzle-orm";
import { and, gte, lte } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let students;

    if (from && to) {
      students = await db
        .select()
        .from(studentsTable)
        .where(
          and(
            gte(studentsTable.createdAt, new Date(from)),

            lte(studentsTable.createdAt, new Date(to)),
          ),
        );
    } else {
      students = await db.select().from(studentsTable);
    }

    return NextResponse.json(students);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch students",
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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();

    const { studentCode, firstName, lastName, gender, age } = body;

    if (!studentCode || !firstName || !lastName || !gender || age == null) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const existingStudent = await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.studentCode, studentCode));

    if (existingStudent.length > 0) {
      return NextResponse.json(
        {
          message: "Student code already exists.",
        },
        {
          status: 409,
        },
      );
    }

    await db.insert(studentsTable).values({
      id: randomUUID(),
      userId: decoded.id,
      studentCode,
      firstName,
      lastName,
      gender,
      age,
    });

    return NextResponse.json(
      {
        message: "Student created successfully",
        body: {
          studentCode,
          firstName,
          lastName,
          gender,
          age,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create student" },
      { status: 500 },
    );
  }
}
