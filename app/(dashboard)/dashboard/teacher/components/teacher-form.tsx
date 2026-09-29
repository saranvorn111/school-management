"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TeacherFormProps = {
  onSuccess?: () => void;
};

export function TeacherForm({ onSuccess }: TeacherFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    teacherCode: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    hireDate: "",
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
        `${process.env.NEXT_PUBLIC_APP_URL}/api/teacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            phone: form.phone || null,
            address: form.address || null,
            dateOfBirth: form.dateOfBirth || null,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create teacher");
      }

      setForm({
        teacherCode: "",
        firstName: "",
        lastName: "",
        gender: "MALE",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        hireDate: "",
      });

      alert("Teacher created successfully");

      // Refresh parent page data
      onSuccess?.();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to create teacher",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Teacher Code */}
        <div className="space-y-2">
          <Label htmlFor="teacherCode">Teacher Code</Label>
          <Input
            id="teacherCode"
            name="teacherCode"
            value={form.teacherCode}
            onChange={handleChange}
            placeholder="TCH001"
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

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john.smith@school.com"
            disabled={loading}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="012 345 678"
            disabled={loading}
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Hire Date */}
        <div className="space-y-2">
          <Label htmlFor="hireDate">Hire Date</Label>
          <Input
            id="hireDate"
            name="hireDate"
            type="date"
            value={form.hireDate}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main St"
            disabled={loading}
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
            "Save Teacher"
          )}
        </Button>
      </div>
    </form>
  );
}
