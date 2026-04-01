import { useMemo } from "react";

export const useMeta = (shows = []) => {
  const clients = useMemo(() => {
    const set = new Set();

    shows.forEach((s) => {
      if (s.client) set.add(s.client.trim());
    });

    return Array.from(set);
  }, [shows]);

  const managers = useMemo(() => {
    const set = new Set();

    shows.forEach((s) => {
      if (s.manager) set.add(s.manager.trim());
    });

    return Array.from(set);
  }, [shows]);

  return { clients, managers };
};
