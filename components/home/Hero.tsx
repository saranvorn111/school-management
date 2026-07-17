import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <GraduationCap size={18} />
            Modern School Management Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Manage Your
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              School Smarter
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Simplify student enrollment, attendance, teachers, examinations,
            grades and reports—all from one secure and beautiful platform built
            for modern education.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border bg-white px-8 py-4 font-semibold text-slate-700 shadow transition hover:bg-slate-100"
            >
              <PlayCircle size={20} />
              Explore Features
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-3 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
              <p className="text-slate-500">Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">500+</h2>
              <p className="text-slate-500">Teachers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">120+</h2>
              <p className="text-slate-500">Courses</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          {/* Dashboard Card */}
          <div className="overflow-hidden rounded-3xl border bg-white shadow-2xl">
            <Image
              src="/images/school.webp"
              alt="School Dashboard"
              width={700}
              height={550}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -left-8 top-10 rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users size={22} />
              </div>

              <div>
                <h3 className="font-bold">1,250</h3>
                <p className="text-sm text-slate-500">Active Students</p>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-6 bottom-10 rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <BookOpen size={22} />
              </div>

              <div>
                <h3 className="font-bold">98%</h3>
                <p className="text-sm text-slate-500">Attendance Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
