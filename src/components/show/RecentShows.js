export default function RecentShows({ shows }) {
  const recent = [...shows]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Show gần đây</h2>

      <div className="space-y-2">
        {recent.map((s) => (
          <div
            key={s._id}
            className="flex justify-between text-sm border-b pb-2"
          >
            <span>{s.title}</span>
            <span className="text-gray-500">
              {new Date(s.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
