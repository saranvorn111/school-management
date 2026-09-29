"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, BookOpen, UserX, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Stats = {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  unassignedClasses: number;
};

type Course = {
  teacherId: string | null;
};

export function SectionCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [studentsRes, teachersRes, coursesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/student`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/teacher`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course`, {
            cache: "no-store",
          }),
        ]);

        const students = studentsRes.ok ? await studentsRes.json() : [];
        const teachers = teachersRes.ok ? await teachersRes.json() : [];
        const courses: Course[] = coursesRes.ok ? await coursesRes.json() : [];

        setStats({
          totalStudents: students.length,
          totalTeachers: teachers.length,
          totalClasses: courses.length,
          unassignedClasses: courses.filter((course) => !course.teacherId)
            .length,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, []);

  const cards: {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
  }[] = [
    {
      title: "Total Students",
      value: stats?.totalStudents ?? "—",
      description: "Enrolled students",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Teachers",
      value: stats?.totalTeachers ?? "—",
      description: "Registered teaching staff",
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Classes",
      value: stats?.totalClasses ?? "—",
      description: "Courses currently offered",
      icon: BookOpen,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Unassigned Classes",
      value: stats?.unassignedClasses ?? "—",
      description: "Classes needing a teacher",
      icon: UserX,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>

              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                {card.description}
              </p>
            </div>

            <div className={`rounded-xl p-3 ${card.iconBg}`}>
              <card.icon className={`h-7 w-7 ${card.iconColor}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
