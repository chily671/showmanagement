"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ shows }) {
  const dataMap = {};

  // gom theo tháng
  shows.forEach((s) => {
    const d = new Date(s.date);
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;

    if (!dataMap[key]) dataMap[key] = 0;
    dataMap[key] += s.cost || 0;
  });

  // convert thành array
  const data = Object.entries(dataMap).map(([month, total]) => ({
    month,
    total,
  }));

  // sort theo thời gian
  data.sort((a, b) => {
    const [m1, y1] = a.month.split("/");
    const [m2, y2] = b.month.split("/");
    return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
  });

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Doanh thu theo tháng</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => v.toLocaleString() + "đ"} />
          <Line type="monotone" dataKey="total" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
