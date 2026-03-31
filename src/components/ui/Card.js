export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>

      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
