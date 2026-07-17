import Link from "next/link";
import { School, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative mt-32 border-t bg-slate-950 text-slate-300"
    >
      {/* Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
                <School size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  School Management
                </h2>

                <p className="text-sm text-slate-400">
                  Modern Education Platform
                </p>
              </div>
            </div>

            <p className="leading-7 text-slate-400">
              Manage students, teachers, attendance, courses, examinations and
              reports from one modern platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link href="/" className="block hover:text-blue-400">
                Home
              </Link>

              <Link href="#features" className="block hover:text-blue-400">
                Features
              </Link>

              <Link href="/login" className="block hover:text-blue-400">
                Login
              </Link>

              <Link href="/register" className="block hover:text-blue-400">
                Register
              </Link>
            </div>
          </div>

          {/* Modules */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              System Modules
            </h3>

            <div className="space-y-3">
              <p>Student Management</p>
              <p>Teacher Management</p>
              <p>Attendance</p>
              <p>Course Management</p>
              <p>Examination</p>
              <p>Reports</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span>support@school.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <span>+855 12 345 678</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-blue-400" />
                <span>Phnom Penh, Cambodia</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="rounded-xl bg-slate-900 p-3 transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-xl bg-slate-900 p-3 transition hover:bg-blue-600 hover:text-white"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-xl bg-slate-900 p-3 transition hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 School Management System. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>

              <Link href="#" className="hover:text-blue-400">
                Terms of Service
              </Link>

              <Link href="#" className="hover:text-blue-400">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
