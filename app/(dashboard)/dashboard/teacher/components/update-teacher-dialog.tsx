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

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE";
};

export default function UpdateTeacherDialog({ teacher }: { teacher: Teacher }) {
  const [open, setOpen] = useState(false);

  async function updateTeacher(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      phone: form.get("phone"),
      address: form.get("address"),
      status: form.get("status"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/teacher/${teacher.id}`,
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
          <DialogTitle>Update Teacher</DialogTitle>
        </DialogHeader>

        <form onSubmit={updateTeacher} className="space-y-4">
          <input
            name="firstName"
            defaultValue={teacher.firstName}
            className="w-full rounded-md border p-2"
          />

          <input
            name="lastName"
            defaultValue={teacher.lastName}
            className="w-full rounded-md border p-2"
          />

          <input
            name="phone"
            defaultValue={teacher.phone ?? ""}
            className="w-full rounded-md border p-2"
          />

          <input
            name="address"
            defaultValue={teacher.address ?? ""}
            className="w-full rounded-md border p-2"
          />

          <select
            name="status"
            defaultValue={teacher.status}
            className="w-full rounded-md border p-2"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
