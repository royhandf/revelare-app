import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById, signin } from "../utils/fetch";
import Footer from "../components/Footer";
import NavbarWithSearch from "../components/NavbarWithSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [randomColor, setRandomColor] = useState("");
  const [error, setError] = useState(null);
  const [newQuery, setNewQuery] = useState("");
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [signInError, setSignInError] = useState("");
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBookById(id);
        setBook(result.data);
        setRelatedBooks(result.related_books);

        const colors = [
          "#f5d0fe",
          "#bae6fc",
          "#A5F3FC",
          "#fecdd3",
          "#FED7AA",
          "#ddd6fe",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setRandomColor(randomColor);
      } catch (err) {
        setError("Failed to fetch book data");
      }
    };

    fetchBook();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken && savedUser) {
      setAuthenticated(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleDownload = () => {
    if (book && book.pdf_link) {
      window.location.href = book.pdf_link;
    }
  };

  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setSignInForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setSignInError("");

    try {
      const response = await signin(signInForm.email, signInForm.password);
      if (response.status === "success") {
        setAuthenticated(true);
        setCurrentUser(response.user);
        navigate(`/books/${id}`);
      }
    } catch (error) {
      setSignInError(error.message || "Failed to sign in. Please try again.");
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

  return (
    <>
      <NavbarWithSearch
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isAuthModalOpen={isAuthModalOpen}
        toggleSignInModal={() => setAuthModalOpen(!isAuthModalOpen)}
        isDropdownMenuOpen={isDropdownMenuOpen}
        toggleDropdownMenu={() => setDropdownMenuOpen(!isDropdownMenuOpen)}
        signInForm={signInForm}
        handleSignInInputChange={handleSignInInputChange}
        handleSignIn={handleSignInSubmit}
        signInError={signInError}
        handleLogout={handleLogout}
        onSearch={handleSearch}
        searchQuery={newQuery}
        setSearchQuery={setNewQuery}
      />
      <Breadcrumb item={{ title: book.title }} />
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto mt-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="container mx-auto p-4 mb-20 bg-white">
        <div className="mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="grid gap-24 md:grid-cols-4">
            <div className="md:col-span-3">
              <h2 className="text-3xl mb-2 font-bold text-gray-800">
                {book.title}
              </h2>
              <p className="text-md text-gray-600">
                by {book.authors || book.editors || "-"}
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">About this ebook</h3>
                <p className="text-gray-700">{book.description}</p>
              </div>

              <hr className="h-px my-8 bg-gray-200 border-0" />

              <div className="w-full p-4">
                <div className="grid grid-cols-10 gap-3 text-sm">
                  <div className="col-span-2">
                    <div className="text-gray-600 mb-2">Language</div>
                    <div className="font-medium text-gray-900">English</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600 mb-2">Publisher</div>
                    <div className="font-medium text-gray-900">
                      {book.publisher}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600 mb-2">Release date</div>
                    <div className="font-medium text-gray-900">
                      {book.published}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="text-gray-600 mb-2">ISBN</div>
                    <div className="font-medium text-gray-900">{book.isbn}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-start">
              <div
                className="mb-8 rounded-lg"
                id="random-bg"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${randomColor} 80%, transparent 50%)`,
                }}
              >
                <img
                  src={book.cover_link}
                  alt={book.title}
                  className="h-auto w-2/3 mx-auto rounded-lg shadow-lg"
                />
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center mt-6 px-4 py-2 text-sm font-medium text-white bg-violet-700 rounded-lg border border-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-violet-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                  />
                </svg>
                <span className="ml-1">Download Ebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 mb-10 bg-white">
        {" "}
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Similar Books You Might Like
          </h2>
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            freeMode={true}
            className="swiper-container"
          >
            {relatedBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <Link to={`/books/${book.id}`} className="block">
                  <BookCard book={book} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;
