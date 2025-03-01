import React from "react";
import DropdownItem from "./DropdownItem";
import { getItem } from "../utils/storage";

const Dropdown = ({ onSignOut }) => {
  const currentUser = getItem("user");

  return (
    <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul className="py-2 text-sm text-gray-700">
        {currentUser && currentUser.role === "admin" && (
          <DropdownItem to="/dashboard">Dashboard</DropdownItem>
        )}
        <DropdownItem to="/">Home</DropdownItem>
        {currentUser && <DropdownItem to="/bookmarks">Bookmarks</DropdownItem>}
        <DropdownItem to="#" onClick={onSignOut}>
          Log out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Dropdown;
