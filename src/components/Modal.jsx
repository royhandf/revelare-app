import React from "react";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

function Modal({ children, isOpen, toggleModal, title, size = "max-w-md" }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-full max-h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={toggleModal}
    >
      <div className={`relative w-full max-h-full ${size}`}>
        <div
          className="relative bg-white rounded-lg shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <Button
              text={<MdOutlineClose />}
              onClick={toggleModal}
              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
            />
          </div>
          {children || (
            <div className="p-4 md:p-5">
              <p className="text-gray-600">
                No detailed information available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
