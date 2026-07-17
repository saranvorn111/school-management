const teachers = [
  {
    id: 1,
    name: "Mr. Smith",
    subject: "Math",
  },
  {
    id: 2,
    name: "Mrs. Linda",
    subject: "English",
  },
  {
    id: 3,
    name: "Mr. David",
    subject: "Physics",
  },
];

export default function TeacherPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Teachers</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Subject</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border p-3">{teacher.id}</td>
              <td className="border p-3">{teacher.name}</td>
              <td className="border p-3">{teacher.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
