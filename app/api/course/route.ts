import { db } from "@/src/db";
import { coursesTable } from "@/src/db/schema";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await db.select().from(coursesTable);

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
