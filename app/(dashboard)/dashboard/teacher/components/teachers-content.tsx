"use client";

import { useEffect, useState } from "react";
import { Users, UserRoundCheck, UserRoundX, UserCog } from "lucide-react";

import TeacherTable from "./teacher-table";
import CreateTeacherDialog from "./create-teacher-dialog";
import StatCard from "./stat-card";

type Teacher = {
  id: string;
  userId: string | null;
  teacherCode: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  email: string;
  phone: string | null;
  address: string | null;
  dateOfBirth: string | null;
  hireDate: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

export default function TeachersContent() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/teacher`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }

        const data = await response.json();

        setTeachers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading teachers...</div>;
  }

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "ACTIVE",
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "INACTIVE",
  ).length;

  const maleTeachers = teachers.filter(
    (teacher) => teacher.gender === "MALE",
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>

          <p className="text-muted-foreground">
            Manage all teachers information
          </p>
        </div>

        <CreateTeacherDialog />
      </div>

      {/* Statistics Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          description="All registered teachers"
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Active Teachers"
          value={activeTeachers}
          description="Currently active teachers"
          icon={UserRoundCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Inactive Teachers"
          value={inactiveTeachers}
          description="Currently inactive teachers"
          icon={UserRoundX}
          iconBg="bg-gray-100"
          iconColor="text-gray-600"
        />

        <StatCard
          title="Male Teachers"
          value={maleTeachers}
          description="Registered male teachers"
          icon={UserCog}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Teacher Table */}

      <div className="rounded-xl border bg-background shadow-sm">
        <TeacherTable teachers={teachers} />
      </div>
    </div>
  );
}
