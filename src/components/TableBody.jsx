import { Link } from "react-router-dom";
import Button from "./Button";
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function TableBody({
  items,
  currentPage,
  onDelete,
  toggleDetailModal,
}) {
  return (
    <tbody>
      {items.map((item, index) => (
        <tr className="bg-white border-b hover:bg-gray-50" key={item.id}>
          <td className="font-medium text-gray-700">
            {(currentPage - 1) * 10 + index + 1}
          </td>
          <td className="p-2">
            <img
              className="h-28 w-20 max-w-20 max-h-28 object-cover rounded-lg"
              src={item.cover_link}
              alt={item.title}
            />
          </td>
          <td>{item.title}</td>
          <td>{item.authors || "-"}</td>
          <td>
            {item.editors
              ? item.editors.split(", ").length > 3
                ? `${item.editors.split(", ").slice(0, 3).join(", ")}, etc`
                : item.editors
              : "-"}
          </td>
          <td>{item.publisher}</td>
          <td>{item.published}</td>
          <td>
            <Button
              className="block text-violet-600 hover:underline"
              onClick={() => toggleDetailModal(item)}
            >
              Detail
            </Button>
          </td>
          <td>
            <a
              href={item.pdf_link}
              target="_blank"
              rel="noreferrer"
              className="block text-violet-600 hover:underline"
            >
              Download
            </a>
          </td>
          <td>
            <div className="flex gap-2">
              <Link
                to={`/dashboard/books/edit/${item.id}`}
                className="text-white bg-yellow-400 hover:bg-amber-400 focus:outline-none rounded-lg text-xs p-2"
              >
                <FiEdit />
              </Link>
              <Button
                className="text-white bg-red-600 hover:bg-red-700 focus:outline-none rounded-lg text-xs p-2"
                onClick={() => onDelete(item.id)}
              >
                <FiTrash2 />
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
