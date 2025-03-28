import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../utils/fetch";
import Swal from "sweetalert2";
import { IoIosSearch } from "react-icons/io";
import Pagination from "../../components/Pagination";
import UserTable from "./UserTable";

const Index = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));

  const fetchUser = async () => {
    try {
      const result = await getUsers();

      let filteredUsers = result.data;

      if (searchQuery) {
        filteredUsers = result.data.filter(
          (user) =>
            (user.name?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (user.email?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            )
        );
      }

      setUsers(filteredUsers);
      setTotalResults(filteredUsers.length);

      if (filteredUsers.length === 0 && currentPage > 1) setCurrentPage(1);
    } catch (error) {
      setError(error.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(async (query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const onSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  useEffect(() => {
    fetchUser();

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      handleSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const handlePageClick = (event) => {
    const selectedpage = event.selected + 1;
    setCurrentPage(selectedpage);
    navigate(`/dashboard/user?page=${selectedpage}`);
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
          const result = await deleteUser(id);

          if (result.status === "success") {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
          }
        } catch (error) {
          Swal.fire("Failed!", error.message, "error");
        }

        navigate("/dashboard/users");
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
          <h2 className="text-2xl font-semibold text-gray-800">Users List</h2>
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
                placeholder="Search by name or email"
                onChange={onSearchChange}
              />
            </div>
          </div>
          <UserTable
            items={users}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
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
