"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Shows", path: "/shows" },
    { name: "Clients", path: "/clients" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-5 flex flex-col gap-6">
      <h2 className="text-xl font-bold">🎤 Manager</h2>

      <nav className="flex flex-col gap-2 text-sm">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded transition ${
              pathname === item.path ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
