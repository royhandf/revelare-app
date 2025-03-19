import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit } from "react-icons/fi";
import TableHeader from "../../components/TableHeader";
import Button from "../../components/Button";

const UserTable = React.memo(
  ({ items, currentPage, itemsPerPage, onDelete }) => {
    const columnHeaders = {
      id: "No",
      name: "Name",
      email: "Email",
      role: "Role",
      registered: "Registered Date",
      action: "Action",
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <TableHeader columnHeaders={columnHeaders} />
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={item.id}>
                <td className="font-medium text-gray-700 px-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-2 py-4">{item.name}</td>
                <td className="px-2">{item.email}</td>
                <td className="px-2">{item.role}</td>
                <td className="px-2">
                  {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/users/edit/${item.id}`}
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
        </table>
      </>
    );
  }
);

export default UserTable;
