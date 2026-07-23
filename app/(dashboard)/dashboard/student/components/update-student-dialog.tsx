"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Student = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  age: number;
};

export default function UpdateStudentDialog({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);

  async function updateStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = {
      studentCode: form.get("studentCode"),
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      gender: form.get("gender"),
      age: Number(form.get("age")),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/student/${student.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (res.ok) {
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline">Update</Button>}
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Student</DialogTitle>
        </DialogHeader>

        <form onSubmit={updateStudent} className="space-y-4">
          <input
            name="studentCode"
            defaultValue={student.studentCode}
            className="w-full rounded-md border p-2"
          />

          <input
            name="firstName"
            defaultValue={student.firstName}
            className="w-full rounded-md border p-2"
          />

          <input
            name="lastName"
            defaultValue={student.lastName}
            className="w-full rounded-md border p-2"
          />

          <select
            name="gender"
            defaultValue={student.gender}
            className="w-full rounded-md border p-2"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <input
            name="age"
            type="number"
            defaultValue={student.age}
            className="w-full rounded-md border p-2"
          />

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
