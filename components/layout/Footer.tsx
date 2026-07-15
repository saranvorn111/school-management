export function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">School Management System</h2>

          <p className="text-gray-400">© 2026 All Rights Reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
