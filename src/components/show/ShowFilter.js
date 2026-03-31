"use client";

export default function ShowFilter({ filter, setFilter }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-wrap gap-3">
      {/* search */}
      <input
        placeholder="Tìm show..."
        className="input"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />

      {/* client */}
      <input
        placeholder="Khách hàng"
        className="input"
        value={filter.client}
        onChange={(e) => setFilter({ ...filter, client: e.target.value })}
      />

      {/* month */}
      <input
        type="month"
        className="input"
        value={filter.month}
        onChange={(e) => setFilter({ ...filter, month: e.target.value })}
      />
    </div>
  );
}
