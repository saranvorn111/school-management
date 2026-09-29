"use client";

import { useCallback, useEffect, useState } from "react";
import { Users, UserRoundCheck, UserRoundX, GraduationCap } from "lucide-react";

import StudentTable from "./student-table";
import CreateStudentDialog from "./create-student-dialog";
import StatCard from "./stat-card";

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

async function getStudents(): Promise<Student[]> {
  const response = await fetch("/api/student", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export default function StudentsContent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Passed to the dialogs so they can reload the list after a
  // create/update/delete, without refreshing the whole page.
  const refreshStudents = useCallback(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading students...</div>;
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
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>

          <p className="text-muted-foreground">
            Manage all students information
          </p>
        </div>

        <CreateStudentDialog onSuccess={refreshStudents} />
      </div>

      {/* Statistics Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          description="All registered students"
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Male Students"
          value={maleStudents}
          description="Registered male students"
          icon={UserRoundCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Female Students"
          value={femaleStudents}
          description="Registered female students"
          icon={UserRoundX}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Average Score"
          value="85%"
          description="Overall academic result"
          icon={GraduationCap}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Student Table */}

      <div className="rounded-xl border bg-background shadow-sm">
        <StudentTable students={students} onChanged={refreshStudents} />
      </div>
    </div>
  );
}
