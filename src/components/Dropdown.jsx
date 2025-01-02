import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ onSignOut }) => {
  return (
    <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul className="py-2 text-sm text-gray-700">
        <DropdownItem to="/dashboard/books">Dashboard</DropdownItem>
        <DropdownItem to="/bookmarks">Bookmarks</DropdownItem>
        <DropdownItem to="/" onClick={onSignOut}>
          Sign out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Dropdown;
