const subjects = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. Smith",
  },
  {
    id: 2,
    name: "English",
    teacher: "Mrs. Linda",
  },
  {
    id: 3,
    name: "Physics",
    teacher: "Mr. David",
  },
];

export default function SubjectPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Subjects</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Teacher</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="border p-3">{subject.id}</td>
              <td className="border p-3">{subject.name}</td>
              <td className="border p-3">{subject.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
