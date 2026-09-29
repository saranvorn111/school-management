"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteTeacherDialog({
  teacherId,
  onSuccess,
}: {
  teacherId: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/teacher/${teacherId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        onSuccess?.();
      }
    } catch (error) {
      console.error("Delete teacher failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            {" "}
            <Trash2 className="h-4 w-4 " />
          </Button>
        }
      ></AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete teacher?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this teacher? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
