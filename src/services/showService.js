export const getShows = async () => {
  const res = await fetch("/api/shows", { cache: "no-store" });
  return res.json();
};

export const createShow = async (data) => {
  return fetch("/api/shows", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteShow = async (id) => {
  return fetch(`/api/shows/${id}`, {
    method: "DELETE",
  });
};

export const updateShow = async (id, data) => {
  return fetch(`/api/shows/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
