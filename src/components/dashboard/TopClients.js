export default function TopClients({ shows = [] }) {
  const map = {};

  shows.forEach((s) => {
    const client = s.client || "Không rõ";

    const extra =
      (s.extraFees || []).reduce(
        (sum, f) => sum + (Number(f.amount) || 0),
        0,
      ) || 0;

    const total = (Number(s.cost) || 0) + extra;

    if (!map[client]) map[client] = 0;
    map[client] += total;
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
            {total.toLocaleString("vi-VN")}đ
          </span>
        </div>
      ))}
    </div>
  );
}
