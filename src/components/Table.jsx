import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Button from "./Button";
import Modal from "./Modal";

function Table({ items, currentPage, perPage, onDelete }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const columnHeaders = {
    id: "ID",
    cover: "Cover",
    title: "Title",
    authors: "Authors",
    editors: "Editors",
    publisher: "Publisher",
    published: "Published Date",
    detail: "Detail",
    Link: "Link Download",
    action: "Action",
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const toggleDetailModal = (item) => {
    setSelectedItem(item);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {Object.values(columnHeaders).map((header, index) => (
              <th key={index} className="p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={index}>
              <td className="font-medium text-gray-700">
                {index + 1 + (currentPage - 1) * perPage}
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
                  text="Detail"
                  className="block text-violet-600 hover:underline"
                  onClick={() => toggleDetailModal(item)} // Mengirimkan data item ke modal
                />
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
                  <Button
                    text={<FiEdit />}
                    className="text-white bg-yellow-400 hover:bg-amber-400 focus:outline-none rounded-lg text-xs p-2"
                  />
                  <Button
                    text={<FiTrash2 />}
                    className="text-white bg-red-600 hover:bg-red-700 focus:outline-none rounded-lg text-xs p-2"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan="10" className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
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

export default Table;
