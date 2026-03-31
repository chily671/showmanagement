"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { formatCurrencyInput, parseCurrency } from "@/lib/format";

export default function ShowForm({ onSubmit, initialData, onClose }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    client: "",
    cost: "",
    location: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 LOAD DATA KHI EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        date: initialData.date || "",
        client: initialData.client || "",
        cost: formatCurrencyInput(initialData.cost?.toString() || ""),
        location: initialData.location || "",
        note: initialData.note || "",
      });
    }
  }, [initialData]);

  // =====================
  // VALIDATE
  // =====================
  const validate = () => {
    const newErrors = {};

    if (!form.title) newErrors.title = "Nhập tên show";
    if (!form.date) newErrors.date = "Chọn ngày";
    if (!form.client) newErrors.client = "Nhập khách";
    if (!form.cost || parseCurrency(form.cost) <= 0)
      newErrors.cost = "Chi phí không hợp lệ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      cost: parseCurrency(form.cost),
    });

    // 🔥 TOAST THEO MODE
    toast.success(initialData ? "Đã cập nhật 🎯" : "Đã thêm show 🎤");

    // reset nếu là add
    if (!initialData) {
      setForm({
        title: "",
        date: "",
        client: "",
        cost: "",
        location: "",
        note: "",
      });
    }

    setErrors({});
    onClose?.(); // đóng modal nếu có
  };

  // =====================
  // UI
  // =====================
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow grid md:grid-cols-3 gap-4"
    >
      {/* TITLE */}
      <div>
        <input
          className="input w-full"
          placeholder="Tên show"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* DATE */}
      <div>
        <input
          type="date"
          className="input w-full"
          value={form.date || ""}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      {/* CLIENT */}
      <div>
        <input
          className="input w-full"
          placeholder="Người book"
          value={form.client || ""}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
        />
        {errors.client && (
          <p className="text-red-500 text-xs mt-1">{errors.client}</p>
        )}
      </div>

      {/* COST */}
      <div>
        <input
          className="input w-full"
          placeholder="Chi phí"
          value={form.cost || ""}
          onChange={(e) =>
            setForm({
              ...form,
              cost: formatCurrencyInput(e.target.value),
            })
          }
        />
        {errors.cost && (
          <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
        )}
      </div>

      {/* LOCATION */}
      <input
        className="input"
        placeholder="Địa điểm"
        value={form.location || ""}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      {/* NOTE */}
      <input
        className="input"
        placeholder="Ghi chú"
        value={form.note || ""}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      {/* BUTTON */}
      <button className="col-span-full bg-black text-white p-3 rounded-xl hover:opacity-90">
        {initialData ? "Cập nhật show" : "+ Thêm show"}
      </button>
    </form>
  );
}
