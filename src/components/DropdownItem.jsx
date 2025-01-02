import React from "react";

const DropdownItem = ({ to, children, onClick }) => {
  return (
    <li>
      <a
        href={to}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );
};

export default DropdownItem;
