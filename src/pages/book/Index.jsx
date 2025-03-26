import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getData, deleteBook } from "../../utils/fetch";
import BookTable from "./BookTable";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";
import debounce from "lodash.debounce";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page"), 10) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const result = await getData(currentPage, itemsPerPage, searchQuery);

      setBooks(result.data);
      setTotalResults(result.total_books);
      setTotalPages(result.total_pages);

      if (result.total_books > 0 && currentPage > result.total_pages) {
        navigate(`/dashboard/books?page=1&search=${searchQuery}`);
      }
    } catch (error) {
      setError(error.message || "Failed to fetch books.");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((query) => {
      navigate(`/dashboard/books?page=1&search=${query}`);
    }, 300),
    [navigate]
  );

  const onSearchChange = (event) => {
    handleSearch(event.target.value);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page"), 10) || 1;
    const search = queryParams.get("search") || "";

    if (page !== currentPage) setCurrentPage(page);
    if (search !== searchQuery) setSearchQuery(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    fetchBooks();

    window.scrollTo({ bottom: 0, behavior: "smooth" });

    return () => {
      handleSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    navigate(`/dashboard/books?page=${selectedPage}&search=${searchQuery}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteBook(id);

          if (result.status === "success") {
            Swal.fire("Deleted!", "The book has been deleted.", "success");
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          }
        } catch (error) {
          Swal.fire("Failed!", error.message, "error");
        }
      }
    });
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong> {error}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Books List</h2>
          <Link
            to="/dashboard/books/create"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            + Add New Book
          </Link>
        </div>

        <div className="relative bg-white overflow-x-auto sm:rounded-lg">
          <div className="pb-4 bg-white ps-1">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoIosSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Search by title, author, or editor"
                onChange={onSearchChange}
              />
            </div>
          </div>
          <BookTable
            items={books}
            currentPage={currentPage}
            onDelete={handleDelete}
          />

          <div className="flex justify-between pt-6">
            <span className="text-sm font-normal text-gray-500">
              Showing{" "}
              <span className="font-semibold">
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalResults)} -{" "}
                {Math.min(currentPage * itemsPerPage, totalResults)}
              </span>{" "}
              of <span className="font-semibold">{totalResults}</span>
            </span>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
