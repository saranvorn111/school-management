"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type Props = {
  courses: Course[];
  teachers: Teacher[];
  onAssign: (courseId: string, teacherId: string | null) => void;
  updatingId: string | null;
};

export default function AssignClassTable({
  courses,
  teachers,
  onAssign,
  updatingId,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-2 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>

            <TableHead>Class</TableHead>

            <TableHead>Credits</TableHead>

            <TableHead>Capacity</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Assigned Teacher</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No classes found.
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{course.code}</TableCell>

                <TableCell>{course.name}</TableCell>

                <TableCell>{course.credits}</TableCell>

                <TableCell>{course.capacity}</TableCell>

                <TableCell>
                  <span
                    className={`
                      rounded-full px-2 py-1 text-xs font-medium
                      ${
                        course.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {course.status}
                  </span>
                </TableCell>

                <TableCell>
                  <Select
                    value={course.teacherId ?? "unassigned"}
                    onValueChange={(value) => {
                      if (value === null) return;

                      onAssign(
                        course.id,
                        value === "unassigned" ? null : value,
                      );
                    }}
                  >
                    <SelectTrigger
                      className="w-52"
                      disabled={updatingId === course.id}
                    >
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>

                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName}
                          {teacher.status === "INACTIVE" ? " (Inactive)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
