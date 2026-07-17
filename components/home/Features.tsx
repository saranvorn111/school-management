import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  FileText,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Student Management",
    description:
      "Manage student profiles, enrollment, class assignments, and academic history in one place.",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Teacher Management",
    description:
      "Organize teacher information, schedules, departments, and teaching assignments.",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Course Management",
    description:
      "Create courses, assign credits, manage semesters, and organize curriculum.",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Attendance Tracking",
    description:
      "Monitor student attendance with daily records and detailed reports.",
    icon: ClipboardCheck,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Examination & Grades",
    description:
      "Record examination scores, calculate grades, and generate report cards.",
    icon: FileText,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Analytics & Reports",
    description:
      "Generate detailed charts and reports to help administrators make decisions.",
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            FEATURES
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything You Need To Manage Your School
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Our platform combines every important school management tool into a
            single, modern, and easy-to-use system.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-600">
                  {feature.description}
                </p>

                <button className="mt-8 font-semibold text-blue-600 transition group-hover:translate-x-2">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
