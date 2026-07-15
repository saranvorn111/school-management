import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          School Management
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>

          <Link
            href="/students"
            className="hover:text-blue-600 transition-colors"
          >
            Students
          </Link>

          <Link
            href="/teachers"
            className="hover:text-blue-600 transition-colors"
          >
            Teachers
          </Link>

          <Link
            href="/courses"
            className="hover:text-blue-600 transition-colors"
          >
            Courses
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
