import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ onSignOut }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul className="py-2 text-sm text-gray-700">
        {currentUser && currentUser.role === "admin" && (
          <DropdownItem to="/dashboard/books">Dashboard</DropdownItem>
        )}
        <DropdownItem to="#" onClick={onSignOut}>
          Log out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Dropdown;
