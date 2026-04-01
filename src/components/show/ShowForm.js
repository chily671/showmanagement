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
    manager: "",
  });

  const [extraFees, setExtraFees] = useState([]);
  const [errors, setErrors] = useState({});

  // =====================
  // EXTRA FEES
  // =====================
  const addFee = () => {
    setExtraFees([...extraFees, { name: "", amount: "" }]);
  };

  const removeFee = (index) => {
    setExtraFees(extraFees.filter((_, i) => i !== index));
  };

  const updateFee = (index, field, value) => {
    const newFees = [...extraFees];
    newFees[index][field] =
      field === "amount" ? formatCurrencyInput(value) : value;
    setExtraFees(newFees);
  };

  // =====================
  // LOAD DATA KHI EDIT
  // =====================
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        date: initialData.date || "",
        client: initialData.client || "",
        cost: formatCurrencyInput(initialData.cost?.toString() || ""),
        location: initialData.location || "",
        note: initialData.note || "",
        manager: initialData.manager || "",
      });

      // 🔥 load extraFees
      setExtraFees(
        (initialData.extraFees || []).map((f) => ({
          name: f.name || "",
          amount: formatCurrencyInput(f.amount?.toString() || ""),
        })),
      );
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
    if (!form.manager) newErrors.manager = "Nhập tên quản lý";

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

      // 🔥 extraFees parse về number
      extraFees: extraFees.map((f) => ({
        name: f.name,
        amount: parseCurrency(f.amount || "0"),
      })),
    });

    toast.success(initialData ? "Đã cập nhật 🎯" : "Đã thêm show 🎤");

    if (!initialData) {
      setForm({
        title: "",
        date: "",
        client: "",
        cost: "",
        location: "",
        note: "",
        manager: "",
      });
      setExtraFees([]);
    }

    setErrors({});
    onClose?.();
  };

  // =====================
  // TOTAL PREVIEW
  // =====================
  const total =
    parseCurrency(form.cost || "0") +
    extraFees.reduce((sum, f) => sum + parseCurrency(f.amount || "0"), 0);

  // =====================
  // UI
  // =====================
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow grid md:grid-cols-3 gap-4"
    >
      {/* TITLE */}
      <input
        className="input"
        placeholder="Tên show"
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* DATE */}
      <input
        type="date"
        className="input"
        value={form.date || ""}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* CLIENT */}
      <input
        className="input"
        placeholder="Người book"
        value={form.client || ""}
        onChange={(e) => setForm({ ...form, client: e.target.value })}
      />

      {/* COST */}
      <input
        className="input"
        placeholder="Chi phí"
        value={form.cost || ""}
        onChange={(e) =>
          setForm({
            ...form,
            cost: formatCurrencyInput(e.target.value),
          })
        }
      />

      {/* MANAGER */}
      <input
        className="input"
        placeholder="Tên quản lý"
        value={form.manager || ""}
        onChange={(e) => setForm({ ...form, manager: e.target.value })}
      />

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

      {/* ===================== */}
      {/* EXTRA FEES */}
      {/* ===================== */}
      <div className="col-span-full space-y-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Phí cộng thêm</p>
          <button
            type="button"
            onClick={addFee}
            className="text-sm text-blue-500"
          >
            + Thêm phí
          </button>
        </div>

        {extraFees.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="Tên phí"
              value={f.name}
              onChange={(e) => updateFee(i, "name", e.target.value)}
            />

            <input
              className="input w-40"
              placeholder="Số tiền"
              value={f.amount}
              onChange={(e) => updateFee(i, "amount", e.target.value)}
            />

            <button
              type="button"
              onClick={() => removeFee(i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL PREVIEW */}
      <div className="col-span-full text-right font-semibold text-green-600">
        Tổng thu: {total.toLocaleString("vi-VN")}đ
      </div>

      {/* BUTTON */}
      <button className="col-span-full bg-black text-white p-3 rounded-xl hover:opacity-90">
        {initialData ? "Cập nhật show" : "+ Thêm show"}
      </button>
    </form>
  );
}
