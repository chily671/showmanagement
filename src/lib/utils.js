import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatMoney(num) {
  const value = Number(num);
  if (isNaN(value)) return "0đ";
  return value.toLocaleString("vi-VN") + "đ";
}
