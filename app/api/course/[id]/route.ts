import { db } from "@/src/db";
import { coursesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const course = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id))
      .limit(1);

    if (!course || course.length === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(course[0]);
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// update course
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const course = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id))
      .limit(1);

    if (!course || course.length === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }

    await db
      .update(coursesTable)
      .set({
        code: body.code,
        name: body.name,
        description: body.description,
        credits: body.credits,
        capacity: body.capacity,
        status: body.status,
      })
      .where(eq(coursesTable.id, id));

    return NextResponse.json({ message: "Course updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// delete course
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const course = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id))
      .limit(1);

    if (!course || course.length === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
    }

    await db.delete(coursesTable).where(eq(coursesTable.id, id));

    return NextResponse.json({ message: "Course deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
