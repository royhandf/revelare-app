import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBooks, signin, signup } from "../utils/fetch";
import ReactPaginate from "react-paginate";
import NavbarWithSearch from "../components/NavbarWithSearch";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

function BookLists() {
  const location = useLocation();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken && savedUser) {
      setAuthenticated(true);
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const queryFromUrl =
      new URLSearchParams(location.search).get("query") || "";
    const pageFromUrl =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;

    if (queryFromUrl !== query || pageFromUrl !== currentPage) {
      setQuery(queryFromUrl);
      setCurrentPage(pageFromUrl);

      fetchBooks(queryFromUrl, pageFromUrl);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchBooks = async (query, page) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchBooks(query, page);
      setBooks(result.data);
      setTotalPages(result.total_pages);
      setTotalResults(result.total_results);
    } catch (err) {
      setError("Gagal memuat data buku. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    navigate(`/books?query=${query}&page=${selectedPage}`);
  };

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await signup(authForm);

      if (response.status === "success") {
        setAuthenticated(true);
        setCurrentUser(response.user);
        setSignInModalOpen(false);
      }
    } catch (error) {
      setAuthError(error.message || "Failed to sign up. Please try again.");
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await signin(authForm.email, authForm.password);
      if (response.status === "success") {
        setAuthenticated(true);
        setCurrentUser(response.user);
        setSignInModalOpen(false);
      }
    } catch (error) {
      setAuthError(error.message || "Failed to sign in. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setCurrentUser(null);
    setDropdownMenuOpen(false);

    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      window.location.href = `/books?query=${newQuery}`;
    }
  };

  const handleBookClick = (bookId) => {
    window.location.href = `/books/${bookId}`;
  };

  return (
    <>
      <NavbarWithSearch
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isSignInModalOpen={isSignInModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
        toggleSignInModal={() => setSignInModalOpen(!isSignInModalOpen)}
        toggleSignUpModal={() => setSignUpModalOpen(!isSignUpModalOpen)}
        isDropdownMenuOpen={isDropdownMenuOpen}
        toggleDropdownMenu={() => setDropdownMenuOpen(!isDropdownMenuOpen)}
        signInForm={authForm}
        handleAuthChange={handleAuthInputChange}
        handleSignIn={handleSignInSubmit}
        handleSignUp={handleSignUpSubmit}
        authError={authError}
        handleLogout={handleLogout}
        onSearch={handleSearch}
        searchQuery={newQuery}
        setSearchQuery={setNewQuery}
      />
      <div className="container mx-auto px-4 py-8 min-h-[80vh]">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="mb-8">
            {query && (
              <>
                <h1 className="text-3xl font-bold text-gray-800">
                  Result for "{query}"
                </h1>
                <p className="mt-2 text-gray-600">
                  Found {totalResults || ""} matching books
                </p>
              </>
            )}
          </div>
          {error && <p className="text-lg text-gray-600">{error}</p>}
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

              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={totalPages || 1}
                forcePage={currentPage - 1}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                containerClassName="flex justify-center -space-x-px h-8 text-sm"
                pageClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                activeClassName="z-10 flex items-center justify-center px-3 h-8 leading-tight text-violet-700 border border-violet-400 bg-violet-50 hover:bg-violet-100 hover:text-violet-700"
                previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                disabledClassName="opacity-50 cursor-not-allowed"
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
