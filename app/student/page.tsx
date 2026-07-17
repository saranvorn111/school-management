const students = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    age: 18,
    class: "A1",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    age: 17,
    class: "A2",
  },
  {
    id: 3,
    name: "David",
    gender: "Male",
    age: 19,
    class: "A1",
  },
];

export default function StudentPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Students</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Gender</th>
            <th className="border p-3">Age</th>
            <th className="border p-3">Class</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border p-3">{student.id}</td>
              <td className="border p-3">{student.name}</td>
              <td className="border p-3">{student.gender}</td>
              <td className="border p-3">{student.age}</td>
              <td className="border p-3">{student.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
