export function Statistics() {
  const stats = [
    { title: "Students", value: "1,250" },
    { title: "Teachers", value: "85" },
    { title: "Courses", value: "30" },
    { title: "Departments", value: "12" },
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl bg-white p-6 text-center shadow"
        >
          <h2 className="text-4xl font-bold text-blue-600">{item.value}</h2>

          <p className="mt-2 text-gray-500">{item.title}</p>
        </div>
      ))}
    </section>
  );
}
