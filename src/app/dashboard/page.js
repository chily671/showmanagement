"use client";

import { useEffect, useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import RecentShows from "@/components/show/RecentShows";
import TopClients from "@/components/dashboard/TopClients";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { formatMoney } from "@/lib/utils";

export default function DashboardPage() {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const res = await fetch("/api/shows", { cache: "no-store" });
    const data = await res.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const totalIncome = useMemo(
    () => shows.reduce((sum, s) => sum + (s.cost || 0), 0),
    [shows],
  );

  const totalShows = shows.length;

  const thisMonthIncome = useMemo(() => {
    const now = new Date();
    return shows
      .filter((s) => {
        const d = new Date(s.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, s) => sum + (s.cost || 0), 0);
  }, [shows]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card
          title="Tổng thu nhập"
          value={formatMoney(totalIncome)}
          icon="💰"
        />
        <Card
          title="Tháng này"
          value={formatMoney(thisMonthIncome)}
          icon="📅"
        />
        <Card title="Tổng show" value={totalShows} icon="🎤" />
      </div>

      {/* Widgets */}
      <div className="grid md:grid-cols-2 gap-4">
        <RecentShows shows={shows} />
        <TopClients shows={shows} />
      </div>
      <RevenueChart shows={shows} />
    </div>
  );
}
