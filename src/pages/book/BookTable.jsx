import React, { useState } from "react";
import Modal from "../../components/Modal";
import TableHeader from "../../components/TableHeader";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Button from "../../components/Button";

const BookTable = React.memo(
  ({ items, currentPage, itemsPerPage, onDelete }) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const columnHeaders = {
      id: "No",
      book: "Book",
      // title: "Title",
      authors: "Authors",
      editors: "Editors",
      publisher: "Publisher",
      published: "Published Date",
      detail: "Detail",
      Link: "Link Download",
      action: "Action",
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const toggleDetailModal = (item) => {
      setSelectedItem(item);
      setIsDetailModalOpen(!isDetailModalOpen);
    };

    return (
      <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <TableHeader columnHeaders={columnHeaders} />
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={item.id}>
                <td className="font-medium text-gray-700">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="p-2 flex justify-start items-center gap-2">
                  <img
                    className="h-28 w-20 max-w-20 max-h-28 object-cover rounded-lg"
                    src={item.cover_link}
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                </td>
                <td>{item.authors || "-"}</td>
                <td>
                  {item.editors
                    ? item.editors.split(", ").length > 3
                      ? `${item.editors
                          .split(", ")
                          .slice(0, 3)
                          .join(", ")}, etc`
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
        </table>

        {isDetailModalOpen && selectedItem && (
          <Modal
            title={selectedItem.title}
            isOpen={isDetailModalOpen}
            toggleModal={toggleDetailModal}
            size="max-w-7xl"
          >
            <div className="p-4 md:p-5 space-y-4">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  ISBN
                </h4>
                <p className="text-gray-600">{selectedItem.isbn}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  Description
                </h4>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  Table of Contents
                </h4>
                <p className="text-gray-600 mb-2">
                  {selectedItem.table_of_contents}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
);

export default BookTable;
