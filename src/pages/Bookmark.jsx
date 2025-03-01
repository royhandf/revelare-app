import { useEffect, useState } from "react";
import NavbarWithSearch from "../components/NavbarWithSearch";
import { getItem } from "../utils/storage";
import { getBookById, getUserBookmarks, removeBookmark } from "../utils/fetch";
import BookmarkCard from "../components/BookmarkCard";
import Swal from "sweetalert2";

const Bookmark = () => {
  const [newQuery, setNewQuery] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const user = getItem("user");
        if (user) {
          const response = await getUserBookmarks(user.id);
          setBookmarks(response.data);

          const bookDataPromises = response.data.map(async (bookmark) => {
            const book = await getBookById(bookmark.book_id);
            return {
              ...bookmark,
              title: book.data.title,
              cover_link: book.data.cover_link,
            };
          });
          const bookData = await Promise.all(bookDataPromises);
          setBookData(bookData);
        } else {
          setError("User is not logged in");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim() && selectedScenario) {
      window.location.href = `/books?query=${newQuery}&scenario=${selectedScenario}`;
    }
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const response = await removeBookmark(bookmarkId);
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Bookmark removed successfully",
        });

        setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
      }
    } catch (error) {
      setError(error.message || "Failed to remove bookmark");
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

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded container mx-auto"
          role="alert"
        >
          <strong className="font-bold">Error!</strong> {error}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 min-h-[80vh]">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Saved Bookmarks
            </h2>
          </div>
          {loading ? (
            <p>Loading your bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p>You haven't saved any bookmarks yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bookData.map((book) => (
                <BookmarkCard
                  key={book.id}
                  book={book}
                  onRemove={handleRemoveBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmark;
