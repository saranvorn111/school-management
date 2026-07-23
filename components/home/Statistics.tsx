import { GraduationCap, Users, BookOpen, ClipboardCheck } from "lucide-react";

const items = [
  {
    title: "Student Management",
    description:
      "Store student information, enrollment details, and academic records in one place.",
    icon: GraduationCap,
  },
  {
    title: "Teacher Management",
    description:
      "Manage teacher profiles, assignments, and classroom responsibilities.",
    icon: Users,
  },
  {
    title: "Course Management",
    description:
      "Create subjects, organize classes, and assign teachers for each course.",
    icon: BookOpen,
  },
  {
    title: "Attendance Tracking",
    description:
      "Monitor daily attendance and generate reports for students and teachers.",
    icon: ClipboardCheck,
  },
];

export function Statistics() {
  return (
    <section id="statistics" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Overview
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Everything You Need to Manage a School
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            A simple and organized system that helps administrators, teachers,
            and staff manage daily school operations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
