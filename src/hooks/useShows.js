"use client";

import { useEffect, useState } from "react";
import {
  getShows,
  createShow,
  deleteShow,
  updateShow,
} from "@/services/showService";

export function useShows() {
  const [shows, setShows] = useState([]);

  const fetchData = async () => {
    const data = await getShows();
    setShows(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addShow = async (form) => {
    await createShow({
      ...form,
      cost: Number(form.cost) || 0,
    });
    fetchData();
  };

  const removeShow = async (id) => {
    await deleteShow(id);
    fetchData();
  };

  const update = async (id, data) => {
    await updateShow(id, data);
    fetchData();
  };

  return {
    shows,
    addShow,
    removeShow,
    updateShow: update,
  };
}
