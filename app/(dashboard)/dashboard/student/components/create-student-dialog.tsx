"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { StudentForm } from "./student-form";

type Props = {
  onSuccess?: () => void;
};

export default function CreateStudentDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="lg" className="cursor-pointer gap-2">
            <Plus className="size-4" />
            Create Student
          </Button>
        }
      />

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="size-5 text-primary" />
            </div>

            <div>
              <DialogTitle>Create Student</DialogTitle>

              <DialogDescription>
                Add a new student to the system.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <StudentForm
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
