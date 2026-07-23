"use client";

import { useEffect, useState } from "react";
import { Users, UserRoundCheck, UserRoundX } from "lucide-react";

import StudentTable from "./student-table";
import CreateStudentDialog from "./create-student-dialog";

type Student = {
  id: string;
  userId: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  age: number;
  createdAt: string;
};

export default function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/student`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading students...</p>;
  }

  const totalStudents = students.length;

  const maleStudents = students.filter(
    (student) => student.gender === "MALE",
  ).length;

  const femaleStudents = students.filter(
    (student) => student.gender === "FEMALE",
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage all students information
          </p>
        </div>

        <CreateStudentDialog />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Students */}
        <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>

              <h2 className="mt-2 text-3xl font-bold">{totalStudents}</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                All registered students
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Users className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Male Students */}
        <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Male Students</p>

              <h2 className="mt-2 text-3xl font-bold">{maleStudents}</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Male percentage
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3">
              <UserRoundCheck className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* Female Students */}
        <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Female Students</p>

              <h2 className="mt-2 text-3xl font-bold">{femaleStudents}</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Female percentage
              </p>
            </div>

            <div className="rounded-xl bg-purple-100 p-3">
              <UserRoundX className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>

              <h2 className="mt-2 text-3xl font-bold">85%</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Overall academic result
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3">
              <svg
                className="h-7 w-7 text-orange-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5" />
                <path d="M12 14L5.84 10.578A12.083 12.083 0 006 20.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <StudentTable students={students} />
      </div>
    </div>
  );
}
