const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-3 rounded-xl shadow text-sm">
      <p className="font-semibold mb-1">{label}</p>

      <p>Cost: {data.cost.toLocaleString("vi-VN")}đ</p>
      <p>Extra: {data.extra.toLocaleString("vi-VN")}đ</p>

      <hr className="my-1" />

      <p className="font-semibold text-green-600">
        Total: {data.total.toLocaleString("vi-VN")}đ
      </p>
    </div>
  );
};
