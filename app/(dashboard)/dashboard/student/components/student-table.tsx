"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UpdateStudentDialog from "./update-student-dialog";
import DeleteStudentDialog from "./delete-student-dialog";

type Student = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  age: number;
  createdAt: string;
};

export default function StudentTable({ students }: { students: Student[] }) {
  return (
    <div className="rounded-xl border bg-white p-2 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Gender</TableHead>

            <TableHead>Age</TableHead>

            <TableHead>Created</TableHead>

            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {student.studentCode}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {student.firstName} {student.lastName}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      Student
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`
                      rounded-full px-2 py-1 text-xs font-medium
                      ${
                        student.gender === "MALE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }
                    `}
                  >
                    {student.gender}
                  </span>
                </TableCell>

                <TableCell>{student.age}</TableCell>

                <TableCell>
                  {new Date(student.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2 ">
                    <UpdateStudentDialog student={student} />

                    <DeleteStudentDialog studentId={student.id} />
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
