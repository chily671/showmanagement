import { formatMoney } from "./utils";

export const calcFinance = (shows = []) => {
  let totalCost = 0;
  let totalExtra = 0;

  const monthly = {};
  const clients = {};

  shows.forEach((s) => {
    if (!s) return;

    const cost = Number(s.cost) || 0;

    const extra =
      (s.extraFees || []).reduce(
        (sum, f) => sum + (Number(f.amount) || 0),
        0,
      ) || 0;

    totalCost += cost;
    totalExtra += extra;

    // 📅 MONTH
    if (s.date) {
      const month = s.date.slice(0, 7);

      if (!monthly[month]) monthly[month] = 0;
      monthly[month] += cost + extra;
    }

    // 👤 CLIENT
    const clientName = s.client || "Không rõ";

    if (!clients[clientName]) clients[clientName] = 0;
    clients[clientName] += cost + extra;
  });

  return {
    totalCost,
    totalExtra,
    totalIncome: totalCost + totalExtra,
    totalShows: shows.length,
    monthly,
    clients,
  };
};
