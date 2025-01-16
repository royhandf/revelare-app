import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { FaSearch } from "react-icons/fa";
import Select from "../components/Select";
import { SCENARIO_OPTIONS } from "../constants";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && selectedScenario) {
      window.location.href = `/books?query=${searchQuery}&scenario=${selectedScenario}`;
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto pb-10 px-6 h-[80vh] flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl mb-3 text-center text-gray-800 font-black leading-10">
            Discover Books with{" "}
            <span className="text-violet-800">Revelare</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Effortlessly connect with the books you love! Use our semantic
            search to browse titles, authors, or keywords.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex">
              <Select
                options={SCENARIO_OPTIONS}
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
              />

              <div className="relative w-full">
                <input
                  type="text"
                  name="query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-3 text-sm text-gray-800 bg-white rounded-e-full border border-gray-300 focus:ring-1 focus:ring-violet-600 focus:border-violet-600 focus:outline-none focus:z-10"
                  placeholder="Search for books by title, author, or keyword"
                />
                <Button className="absolute top-0 end-0 p-4 text-sm font-sm h-full text-white bg-violet-700 rounded-e-3xl border border-violet-700 hover:bg-violet-800 focus:ring-1 focus:outline-none focus:ring-violet-300">
                  <FaSearch className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
