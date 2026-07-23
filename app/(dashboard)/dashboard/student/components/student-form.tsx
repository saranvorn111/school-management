"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StudentFormProps = {
  onSuccess?: () => void;
};

export function StudentForm({ onSuccess }: StudentFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    studentCode: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    age: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            age: Number(form.age),
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create student");
      }

      setForm({
        studentCode: "",
        firstName: "",
        lastName: "",
        gender: "MALE",
        age: "",
      });

      alert("Student created successfully");

      // Refresh parent page data
      onSuccess?.();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to create student",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Student Code */}
        <div className="space-y-2">
          <Label htmlFor="studentCode">Student Code</Label>
          <Input
            id="studentCode"
            name="studentCode"
            value={form.studentCode}
            onChange={handleChange}
            placeholder="STU001"
            disabled={loading}
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>

          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            disabled={loading}
            required
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Smith"
            disabled={loading}
            required
          />
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            min={1}
            max={100}
            placeholder="18"
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="flex justify-end border-t pt-6 ">
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Student"
          )}
        </Button>
      </div>
    </form>
  );
}
