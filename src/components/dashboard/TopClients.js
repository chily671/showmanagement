export default function TopClients({ shows }) {
  const map = {};

  shows.forEach((s) => {
    if (!map[s.client]) map[s.client] = 0;
    map[s.client] += s.cost || 0;
  });

  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Top khách hàng</h2>

      {sorted.map(([name, total]) => (
        <div key={name} className="flex justify-between text-sm mb-2">
          <span>{name}</span>
          <span className="font-medium text-blue-600">
            {total.toLocaleString()}đ
          </span>
        </div>
      ))}
    </div>
  );
}
