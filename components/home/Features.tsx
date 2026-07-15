export function Features() {
  const features = [
    "Student Management",
    "Teacher Management",
    "Course Management",
    "Attendance Tracking",
    "Grade Management",
    "Reports",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-center text-4xl font-bold">System Features</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-xl bg-white p-8 shadow hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{feature}</h3>

            <p className="mt-3 text-gray-600">
              Manage {feature.toLowerCase()} efficiently using the School
              Management System.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
