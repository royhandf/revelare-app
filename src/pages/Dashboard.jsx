import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook, getData, deleteBook } from "../utils/fetch";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Button from "../components/Button";
import ReactPaginate from "react-paginate";
import { IoIosSearch } from "react-icons/io";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import Textarea from "../components/Textarea";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const perPage = 5;

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    editors: "",
    publisher: "",
    published: "",
    isbn: "",
    pdf_link: "",
    cover_link: "",
    description: "",
    table_of_contents: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getData(currentPage);
        setBooks(result.data);
        setFilteredBooks(result.data);
        setTotalPages(result.total_pages);
        setTotalResults(result.total_results);

        if (result.data.length === 0 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      } catch (error) {
        setError(error.message || "Failed to fetch books.");
        navigate("/error", { state: { message: error.message } });
      }
    };

    fetchBooks();
    window.scrollTo(0, 0);
  }, [currentPage, navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    navigate(`/dashboard/books?page=${selectedPage}`);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.authors.toLowerCase().includes(value.toLowerCase()) ||
          book.editors.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filteredBooks);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "pdf_link" || name === "cover_link") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await addBook(data);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Book has been successfully added.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          toggleModal();

          console.log(response);
          setCurrentPage(1);
        });

        setFormData({
          title: "",
          authors: "",
          editors: "",
          publisher: "",
          published: "",
          isbn: "",
          pdf_link: "",
          cover_link: "",
          description: "",
          table_of_contents: "",
        });
      } else if (response.status === "error") {
        if (response.message.includes("Duplicate book")) {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.message || "An error occurred.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      Swal.fire("Failed!", error.message, "error");
    }
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
          await deleteBook(id); // Menghapus data dari backend
          Swal.fire("Deleted!", "The book has been deleted.", "success");

          const updatedBooks = books.filter((book) => book.id !== id);
          setBooks(updatedBooks);
          setFilteredBooks(updatedBooks);
        } catch (error) {
          Swal.fire("Failed!", error.message, "error");
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Books List</h2>
          <Button
            onClick={toggleModal}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            text="+ Add New Book"
          />

          {isModalOpen && (
            <Modal
              title="Add New Book"
              isOpen={isModalOpen}
              toggleModal={toggleModal}
              size="max-w-7xl"
            >
              <form
                method="post"
                onSubmit={handleSubmit}
                className="p-4 md:p-5"
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-4">
                    <InputField
                      label="Title"
                      name="title"
                      type="text"
                      placeholder="Add title here"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />

                    <InputField
                      label="Authors (Name; Name; ...)"
                      name="authors"
                      type="text"
                      placeholder="Add authors here"
                      value={formData.authors}
                      onChange={handleInputChange}
                    />

                    <InputField
                      label="Editors (Name; Name; ...)"
                      name="editors"
                      type="text"
                      placeholder="Add editors here"
                      value={formData.editors}
                      onChange={handleInputChange}
                    />

                    <InputField
                      label="Publisher"
                      name="publisher"
                      type="text"
                      placeholder="Add publisher here"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      required
                    />

                    <InputField
                      label="Year of Publication"
                      name="published"
                      type="number"
                      placeholder="Add year here"
                      value={formData.published}
                      onChange={handleInputChange}
                      required
                    />

                    <InputField
                      label="ISBN"
                      name="isbn"
                      type="number"
                      placeholder="Add ISBN here"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      required
                    />

                    <InputField
                      label="Book File (PDF)"
                      name="pdf_link"
                      type="file"
                      accept=".pdf"
                      onChange={handleInputChange}
                      maxSize={50 * 1024 * 1024}
                      required
                    />

                    <InputField
                      label="Cover Image"
                      name="cover_link"
                      type="file"
                      accept="image/*"
                      onChange={handleInputChange}
                      maxSize={2 * 1024 * 1024}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Textarea
                      label="Description"
                      name="description"
                      placeholder="Write a description here"
                      onChange={handleInputChange}
                    >
                      {formData.description}
                    </Textarea>

                    <Textarea
                      label="Table of Contents"
                      name="table_of_contents"
                      placeholder="Write a table of contents here"
                      onChange={handleInputChange}
                    >
                      {formData.table_of_contents}
                    </Textarea>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="submit"
                    className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
          )}
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
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <Table
            items={filteredBooks}
            currentPage={currentPage}
            perPage={perPage}
            onDelete={handleDelete}
          />

          <div className="flex justify-between pt-6">
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-700 ">
                {Math.min((currentPage - 1) * perPage + 1, totalResults)}-
                {Math.min(currentPage * perPage, totalResults)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700 ">
                {totalResults}
              </span>
            </span>

            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={totalPages || 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              containerClassName="flex justify-center -space-x-px h-8 text-sm"
              pageClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              activeClassName="z-10 flex items-center justify-center px-3 h-8 leading-tight text-violet-700 border border-violet-400 bg-violet-100 hover:bg-violet-100 hover:text-violet-700"
              previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              breakClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 cursor-default"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
