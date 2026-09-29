import { db } from "@/src/db";
import { coursesTable } from "@/src/db/schema/course";
import { teachersTable } from "@/src/db/schema/teacher";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await db
    .select({
      id: coursesTable.id,
      code: coursesTable.code,
      name: coursesTable.name,
      description: coursesTable.description,
      credits: coursesTable.credits,
      capacity: coursesTable.capacity,
      teacherId: coursesTable.teacherId,
      status: coursesTable.status,
      createdAt: coursesTable.createdAt,
      updatedAt: coursesTable.updatedAt,
      teacherFirstName: teachersTable.firstName,
      teacherLastName: teachersTable.lastName,
    })
    .from(coursesTable)
    .leftJoin(teachersTable, eq(coursesTable.teacherId, teachersTable.id));

  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const body = await req.json();

  const course = {
    id: randomUUID(),
    code: body.code,
    name: body.name,
    description: body.description,
    credits: body.credits,
    capacity: body.capacity,
    teacherId: body.teacherId ?? null,
    status: body.status ?? "ACTIVE",
  };

  await db.insert(coursesTable).values(course);

  return NextResponse.json(
    {
      message: "Course created",
      data: course,
    },
    { status: 201 },
  );
}
