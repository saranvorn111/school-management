const classes = [
  {
    id: 1,
    name: "A1",
    room: "101",
  },
  {
    id: 2,
    name: "A2",
    room: "102",
  },
  {
    id: 3,
    name: "B1",
    room: "201",
  },
];

export default function ClassPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Classes</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Class</th>
            <th className="border p-3">Room</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr key={item.id}>
              <td className="border p-3">{item.id}</td>
              <td className="border p-3">{item.name}</td>
              <td className="border p-3">{item.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
