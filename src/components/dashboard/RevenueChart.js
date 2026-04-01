"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ shows = [] }) {
  const dataMap = {};

  shows.forEach((s) => {
    if (!s?.date) return;

    const d = new Date(s.date);
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;

    const cost = Number(s.cost) || 0;

    const extra =
      (s.extraFees || []).reduce(
        (sum, f) => sum + (Number(f.amount) || 0),
        0,
      ) || 0;

    if (!dataMap[key]) {
      dataMap[key] = { cost: 0, extra: 0, total: 0 };
    }

    dataMap[key].cost += cost;
    dataMap[key].extra += extra;
    dataMap[key].total += cost + extra;
  });

  const data = Object.entries(dataMap).map(([month, val]) => ({
    month,
    total: val.total,
    cost: val.cost,
    extra: val.extra,
  }));

  // sort theo thời gian
  data.sort((a, b) => {
    const [m1, y1] = a.month.split("/");
    const [m2, y2] = b.month.split("/");
    return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded-xl shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>Cost: {data.cost.toLocaleString("vi-VN")}đ</p>
        <p>Extra: {data.extra.toLocaleString("vi-VN")}đ</p>
        <p className="font-semibold text-green-600">
          Total: {data.total.toLocaleString("vi-VN")}đ
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Tổng thu theo tháng</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="total" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
