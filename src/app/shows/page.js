"use client";

import { useMemo, useState } from "react";
import { useShows } from "@/hooks/useShows";
import ShowTable from "@/components/show/ShowTable";
import ShowCalendar from "@/components/show/ShowCalendar";
import ShowFilter from "@/components/show/ShowFilter";
import ShowForm from "@/components/show/ShowForm";
import Modal from "@/components/ui/Modal";
import { useMeta } from "@/hooks/useMeta";

export default function ShowsPage() {
  const { shows, addShow, removeShow, updateShow } = useShows();
  const { clients, managers } = useMeta(shows);
  const [filter, setFilter] = useState({
    search: "",
    client: "",
    month: "",
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filteredShows = useMemo(() => {
    return shows.filter((s) => {
      const matchSearch = s.title
        ?.toLowerCase()
        .includes(filter.search.toLowerCase());

      const matchClient = s.client
        ?.toLowerCase()
        .includes(filter.client.toLowerCase());

      const matchMonth = filter.month ? s.date?.startsWith(filter.month) : true;

      return matchSearch && matchClient && matchMonth;
    });
  }, [shows, filter]);

  const handleSubmit = (data) => {
    if (editing) {
      updateShow(editing._id, data);
    } else {
      addShow(data);
    }
  };

  const handleMoveShow = async (id, newDate) => {
    await updateShow(id, { date: newDate });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quản lý show</h1>

      <button
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        + Thêm show
      </button>

      <ShowFilter filter={filter} setFilter={setFilter} />

      <ShowCalendar
        shows={filteredShows}
        onSelectShow={(show) => {
          setEditing(show); // 🔥 dùng chung
          setOpen(true); // 🔥 mở modal
        }}
      />

      <ShowTable
        shows={filteredShows}
        onDelete={removeShow}
        onEdit={(s) => {
          setEditing(s);
          setOpen(true);
        }}
      />

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ShowForm
          initialData={editing}
          clients={clients}
          managers={managers}
          onSubmit={(data) => {
            if (editing) {
              updateShow(editing._id, data);
            } else {
              addShow(data);
            }
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
}
