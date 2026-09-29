"use client";

import { useEffect, useState } from "react";
import { BookOpen, UserCheck, UserX } from "lucide-react";

import AssignClassTable from "./assign-class-table";
import StatCard from "./stat-card";

type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  capacity: number;
  teacherId: string | null;
  status: "ACTIVE" | "INACTIVE";
};

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function AssignClassContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, teachersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/teacher`, {
            cache: "no-store",
          }),
        ]);

        if (!coursesRes.ok || !teachersRes.ok) {
          throw new Error("Failed to fetch classes or teachers");
        }

        setCourses(await coursesRes.json());
        setTeachers(await teachersRes.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function assignTeacher(courseId: string, teacherId: string | null) {
    setUpdatingId(courseId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/course/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update teacher assignment");
      }

      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, teacherId } : course,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update teacher assignment");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">Loading classes...</div>
    );
  }

  const totalCourses = courses.length;

  const assignedCourses = courses.filter((course) => course.teacherId).length;

  const unassignedCourses = totalCourses - assignedCourses;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Assign Classes</h1>

        <p className="text-muted-foreground">
          Assign a teacher to each class
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Classes"
          value={totalCourses}
          description="All classes/courses"
          icon={BookOpen}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Assigned"
          value={assignedCourses}
          description="Classes with a teacher"
          icon={UserCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Unassigned"
          value={unassignedCourses}
          description="Classes needing a teacher"
          icon={UserX}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Assign Class Table */}

      <div className="rounded-xl border bg-background shadow-sm">
        <AssignClassTable
          courses={courses}
          teachers={teachers}
          onAssign={assignTeacher}
          updatingId={updatingId}
        />
      </div>
    </div>
  );
}
