import React from "react";

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <div className="flex-1 max-w-md mx-4">
      <form onSubmit={onSearch} className="flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            name="query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-4 p-2.5"
            placeholder="Search for books by title, author, or keyword"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-violet-700 rounded-lg border border-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-violet-300"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
