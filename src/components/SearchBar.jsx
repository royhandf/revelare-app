import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import { SCENARIO_OPTIONS } from "../constants";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [selectedScenario, setSelectedScenario] = useState("");

  return (
    <form onSubmit={onSearch} className="flex-1 max-w-xl mx-auto">
      <div className="flex">
        <Select
          options={SCENARIO_OPTIONS}
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          className="rounded-s-lg bg-gray-50"
        />

        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 block w-full ps-3 p-2.5"
          placeholder="Search for books by title, author, or keyword"
        />
        <Button className="inline-flex items-center p-3 text-sm font-medium text-white bg-violet-700 rounded-e-lg border border-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-violet-300">
          <FaSearch />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
