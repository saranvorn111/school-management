import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { teachersTable } from "@/src/db/schema";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const teacher = await db
    .select()
    .from(teachersTable)
    .where(eq(teachersTable.id, id));

  if (teacher.length === 0) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }

  return NextResponse.json(teacher);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const body = await req.json();

    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        {
          message: "First name and last name are required",
        },
        {
          status: 400,
        },
      );
    }

    const teacher = await db
      .select()
      .from(teachersTable)
      .where(eq(teachersTable.id, id));

    if (teacher.length === 0) {
      return NextResponse.json(
        {
          message: "Teacher not found",
        },
        {
          status: 404,
        },
      );
    }

    await db
      .update(teachersTable)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        address: body.address,
        status: body.status,
        updatedAt: new Date(),
      })
      .where(eq(teachersTable.id, id));

    const updatedTeacher = await db
      .select()
      .from(teachersTable)
      .where(eq(teachersTable.id, id));

    return NextResponse.json(
      {
        message: "Teacher updated successfully",
        data: updatedTeacher[0],
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Update teacher error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.delete(teachersTable).where(eq(teachersTable.id, params.id));

    return NextResponse.json({
      message: "Teacher deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Delete failed",
      },
      {
        status: 500,
      },
    );
  }
}
