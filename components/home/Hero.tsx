import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
      <div>
        <h1 className="mb-6 text-5xl font-bold">
          Welcome to
          <span className="text-blue-600"> School Management System</span>
        </h1>

        <p className="mb-8 text-gray-600">
          A complete platform for managing students, teachers, courses,
          attendance, and academic records.
        </p>

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white">
          Get Started
        </button>
      </div>

      <Image
        src="/images/school.webp"
        alt="School"
        className="rounded-xl"
        width={600}
        height={400}
      />
    </section>
  );
}
