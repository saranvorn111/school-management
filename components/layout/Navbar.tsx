"use client";

import Link from "next/link";
import { ChevronDown, Menu, School, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/src/context/auth-context";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Statistics",
    href: "#statistics",
  },
  {
    title: "Contact",
    href: "#footer",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <School size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              School Management
            </h1>

            <p className="text-xs text-slate-500">Modern Education Platform</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center md:flex pointer-events-auto gap-4">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-100">
                <Avatar className="h-9 w-9">
                  {/* <AvatarImage src={user.avatar} /> */}
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                  <AvatarBadge className="h-3 w-3 border-2 border-white bg-green-500" />
                </Avatar>

                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">
                    {user.username}
                  </p>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 hidden w-52 rounded-xl border bg-white p-2 shadow-xl group-hover:block">
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
                >
                  Profile
                </Link>

                <Link
                  href="/dashboard"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
                >
                  Dashboard
                </Link>

                <button
                  className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-medium text-slate-700 transition hover:text-blue-600"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-5 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-lg font-medium text-slate-700"
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/login"
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
function setUser(arg0: null) {
  throw new Error("Function not implemented.");
}
