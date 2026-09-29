"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Student = {
  createdAt: string;
};

type MonthBucket = {
  key: string;
  label: string;
};

const chartConfig = {
  students: {
    label: "New Students",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function getLastTwelveMonths(): MonthBucket[] {
  const months: MonthBucket[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
    });
  }

  return months;
}

export function ChartAreaInteractive() {
  const [chartData, setChartData] = useState<
    { month: string; students: number }[]
  >([]);

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

        const students: Student[] = await res.json();
        const months = getLastTwelveMonths();
        const counts = new Map(months.map((month) => [month.key, 0]));

        for (const student of students) {
          const date = new Date(student.createdAt);
          const key = `${date.getFullYear()}-${date.getMonth()}`;

          if (counts.has(key)) {
            counts.set(key, (counts.get(key) ?? 0) + 1);
          }
        }

        setChartData(
          months.map((month) => ({
            month: month.label,
            students: counts.get(month.key) ?? 0,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudents();
  }, []);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>New Student Enrollments</CardTitle>

        <CardDescription>
          Students enrolled per month, last 12 months
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-students)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-students)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillStudents)"
              stroke="var(--color-students)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
