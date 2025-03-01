import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBooks } from "../utils/fetch";
import NavbarWithSearch from "../components/NavbarWithSearch";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { getSession, setSession } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

function BookLists() {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, toggleSignInModal } = useAuth();

  useEffect(() => {
    const queryFromUrl =
      new URLSearchParams(location.search).get("query") || "";
    const scenarioFromUrl =
      new URLSearchParams(location.search).get("scenario") || "";
    const pageFromUrl =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;

    if (
      queryFromUrl !== query ||
      pageFromUrl !== currentPage ||
      scenarioFromUrl !== selectedScenario
    ) {
      setQuery(queryFromUrl);
      setSelectedScenario(scenarioFromUrl);
      setCurrentPage(pageFromUrl);

      fetchBooks(queryFromUrl, scenarioFromUrl, pageFromUrl);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchBooks = async (query, scenario, page) => {
    setLoading(true);
    try {
      const result = await searchBooks(query, scenario, page);
      setBooks(result.data);
      setTotalPages(result.total_pages);
      setTotalResults(result.total_results);

      const sessionQuery = getSession("query");

      if (query !== sessionQuery && page === 1) {
        const relatedBooks = result.data.slice(0, 8);
        setSession("query", query);
        setSession("relatedBooks", relatedBooks);
      }
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    navigate(`/books?query=${query}&page=${selectedPage}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim() && selectedScenario) {
      window.location.href = `/books?query=${newQuery}&scenario=${selectedScenario}`;
    }
  };

  const handleBookClick = (bookId) => {
    if (isAuthenticated) {
      navigate(`/books/${bookId}`);
    } else {
      toggleSignInModal();
    }
  };

  return (
    <>
      <NavbarWithSearch
        onSearch={handleSearch}
        searchQuery={newQuery}
        setSearchQuery={setNewQuery}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
      />
      <div className="container mx-auto px-4 py-8 min-h-[80vh]">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="mb-8">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto mb-3"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            {query && (
              <>
                <h1 className="text-3xl font-bold text-gray-800">
                  Result for "{query}"{" "}
                </h1>
                <p className="mt-2 text-gray-600">
                  Found {totalResults || ""} matching books
                </p>
              </>
            )}
          </div>
          {loading ? (
            <p className="text-md text-gray-600">Loading...</p>
          ) : books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {books.map((book, index) => (
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={() => handleBookClick(book.id)}
                    key={index}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
              />
            </>
          ) : !loading && query ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="48"
                height="48"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                <path d="M9 9h.01M15 9h.01" />
              </svg>
              <p className="text-lg text-gray-600">
                No books found for "{query}".
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookLists;
