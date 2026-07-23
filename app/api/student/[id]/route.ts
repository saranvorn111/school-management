import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { studentsTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const student = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.id, id));

  if (student.length === 0) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const { studentCode, firstName, lastName, gender, age } = body;

  if (!studentCode || !firstName || !lastName || !gender || age == null) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }

  const student = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.id, id));

  if (student.length === 0) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }
  const existingStudent = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.studentCode, studentCode));

  if (existingStudent.length > 0 && existingStudent[0].id !== id) {
    return NextResponse.json(
      {
        message: "Student code already exists.",
      },
      {
        status: 409,
      },
    );
  }

  await db
    .update(studentsTable)
    .set({
      studentCode,
      firstName,
      lastName,
      gender,
      age,
    })
    .where(eq(studentsTable.id, id));

  return NextResponse.json({
    message: "Student updated successfully",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const student = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.id, id));

  if (student.length === 0) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  await db.delete(studentsTable).where(eq(studentsTable.id, id));

  return NextResponse.json({
    message: "Student deleted successfully",
  });
}
