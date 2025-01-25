import React, { useState } from "react";
import Modal from "../../components/Modal";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";

const BookTable = React.memo(
  ({ items, currentPage, itemsPerPage, onDelete }) => {
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
          <TableBody
            items={currentItems}
            currentPage={currentPage}
            onDelete={onDelete}
            toggleDetailModal={toggleDetailModal}
          />
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
);

export default BookTable;
