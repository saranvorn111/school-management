"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UpdateTeacherDialog from "./update-teacher-dialog";
import DeleteTeacherDialog from "./delete-teacher-dialog";

type Teacher = {
  id: string;
  teacherCode: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  email: string;
  phone: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE";
  hireDate: string;
};

export default function TeacherTable({
  teachers,
  onChanged,
}: {
  teachers: Teacher[];
  onChanged?: () => void;
}) {
  return (
    <div className="rounded-xl border bg-white p-2 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Gender</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Hire Date</TableHead>

            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teachers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No teachers found.
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {teacher.teacherCode}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {teacher.firstName} {teacher.lastName}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      Teacher
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`
                      rounded-full px-2 py-1 text-xs font-medium
                      ${
                        teacher.gender === "MALE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }
                    `}
                  >
                    {teacher.gender}
                  </span>
                </TableCell>

                <TableCell>{teacher.email}</TableCell>

                <TableCell>
                  <span
                    className={`
                      rounded-full px-2 py-1 text-xs font-medium
                      ${
                        teacher.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {teacher.status}
                  </span>
                </TableCell>

                <TableCell>
                  {new Date(teacher.hireDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2 ">
                    <UpdateTeacherDialog
                      teacher={teacher}
                      onSuccess={onChanged}
                    />

                    <DeleteTeacherDialog
                      teacherId={teacher.id}
                      onSuccess={onChanged}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
