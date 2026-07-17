import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

const statistics = [
  {
    title: "Students Managed",
    value: "10K+",
    description: "Student records managed efficiently.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Teachers",
    value: "500+",
    description: "Teachers using the platform daily.",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Courses",
    value: "120+",
    description: "Courses organized every semester.",
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    description: "Reliable cloud infrastructure.",
    icon: Award,
    color: "from-orange-500 to-red-500",
  },
];

export function Statistics() {
  return (
    <section id="statistics" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            OUR IMPACT
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Trusted by Modern Schools
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            A complete platform designed to simplify academic management,
            improve productivity, and deliver better educational experiences.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-extrabold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-3 text-lg font-semibold text-slate-800">
                  {item.title}
                </p>

                <p className="mt-2 leading-7 text-slate-500">
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
