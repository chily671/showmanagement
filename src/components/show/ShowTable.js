import { formatMoney } from "@/lib/utils";

export default function ShowTable({ shows, onDelete, onEdit }) {
  console.log("🚀 ~ ShowTable ~ shows:", shows);
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {shows?.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-3">{s.title}</td>
              <td className="p-3">{formatMoney(s.cost)}</td>

              <td className="p-3">
                <button
                  onClick={() => onDelete(s._id)}
                  className="text-red-500"
                >
                  Xóa
                </button>
                <button
                  onClick={() => onEdit(s)}
                  className="text-blue-500 mr-3"
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
