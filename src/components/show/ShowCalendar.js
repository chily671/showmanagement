"use client";

import { useState } from "react";

export default function ShowCalendar({
  shows = [],
  onSelectShow, // 🔥 mở modal edit
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  // ======================
  // GROUP DATA
  // ======================
  const map = {};

  shows.forEach((s) => {
    if (!s?.date) return;

    const dateKey = new Date(new Date(s.date).getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(s);
  });
  // ======================
  // CALENDAR LOGIC
  // ======================
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i,
    ).padStart(2, "0")}`;
    days.push(dateStr);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // ======================
  // UI
  // ======================
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="btn">
          ◀
        </button>

        <h2 className="font-semibold text-lg">
          Tháng {month + 1} / {year}
        </h2>

        <button onClick={nextMonth} className="btn">
          ▶
        </button>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          if (!d) return <div key={i}></div>;

          const day = Number(d.split("-")[2]);
          const showsOfDay = map[d] || [];
          const isToday = d === today;
          const isSelected = selectedDate === d;

          return (
            <div
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`
                p-2 h-24 rounded-xl border cursor-pointer transition
                hover:shadow-md
                ${isSelected ? "bg-black text-white" : ""}
                ${isToday ? "border-green-500 border-2" : ""}
              `}
            >
              {/* DAY NUMBER */}
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium">{day}</span>

                {showsOfDay.length > 0 && (
                  <span className="text-xs bg-green-500 text-white px-2 rounded-full">
                    {showsOfDay.length}
                  </span>
                )}
              </div>

              {/* 🔥 PREVIEW SHOW */}
              <div className="space-y-1 text-xs">
                {showsOfDay.slice(0, 2).map((s) => (
                  <div
                    key={s._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectShow?.(s); // 🔥 mở modal edit
                    }}
                    className="truncate bg-gray-100 px-1 rounded hover:bg-gray-200"
                  >
                    {s.title}
                  </div>
                ))}

                {showsOfDay.length > 2 && (
                  <p className="text-gray-400">+{showsOfDay.length - 2} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LIST CHI TIẾT */}
      {selectedDate && map[selectedDate] && (
        <div className="mt-5 space-y-2">
          <h3 className="font-semibold">Show ngày {selectedDate}</h3>

          {map[selectedDate].map((s) => {
            const total =
              (s.cost || 0) +
              (s.extraFees?.reduce((sum, f) => sum + f.amount, 0) || 0);

            return (
              <div
                key={s._id}
                onClick={() => onSelectShow?.(s)}
                className="p-3 border rounded-xl flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-gray-500">{s.client}</p>
                </div>

                <p className="text-green-600 font-semibold">
                  {total.toLocaleString("vi-VN")}đ
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
