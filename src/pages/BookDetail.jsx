import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById, signin, signup } from "../utils/fetch";
import Footer from "../components/Footer";
import NavbarWithSearch from "../components/NavbarWithSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import { FiDownload, FiBookmark } from "react-icons/fi";
import Button from "../components/Button";
import { RANDOM_COLORS } from "../constants";
import { useAuth } from "../context/AuthContext";
import { getSession } from "../utils/storage";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

function BookDetail() {
  const { id } = useParams();
  const { handleLogin, handleLogout } = useAuth();
  const [book, setBook] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [randomColor, setRandomColor] = useState("");
  const [error, setError] = useState(null);
  const [newQuery, setNewQuery] = useState("");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBookById(id);
        setBook(result.data);
        const savedRelatedBooks = getSession("relatedBooks");

        if (Array.isArray(savedRelatedBooks))
          setRelatedBooks(savedRelatedBooks);

        const randomColor =
          RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
        setRandomColor(randomColor);
      } catch (err) {
        setError("Failed to fetch book data");
      }
    };

    fetchBook();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleDownload = () => {
    if (book && book.pdf_link) {
      window.location.href = book.pdf_link;
    }
  };

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(authForm);

      if (response.status === "success") {
        handleLogin(response.user, response.token);
        setSignInModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to sign up",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(authForm.email, authForm.password);
      if (response.status === "success") {
        handleLogin(response.user, response.token);
        setSignInModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to sign in",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      window.location.href = `/books?query=${newQuery}`;
    }
  };

  const filteredRelatedBooks = useMemo(() => {
    if (relatedBooks && book.id) {
      return relatedBooks.filter((relatedBook) => relatedBook.id !== book.id);
    }
    return [];
  }, [relatedBooks, book.id]);

  return (
    <>
      <NavbarWithSearch
        isSignInModalOpen={isSignInModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
        toggleSignInModal={() => setSignInModalOpen(!isSignInModalOpen)}
        toggleSignUpModal={() => setSignUpModalOpen(!isSignUpModalOpen)}
        signInForm={authForm}
        handleAuthChange={handleAuthInputChange}
        handleSignIn={handleSignInSubmit}
        handleSignUp={handleSignUpSubmit}
        handleLogout={handleLogout}
        onSearch={handleSearch}
        searchQuery={newQuery}
        setSearchQuery={setNewQuery}
      />
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded container mx-auto"
          role="alert"
        >
          <strong className="font-bold">Error!</strong> {error}
        </div>
      )}
      <Breadcrumb item={{ title: book.title }} />

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

              <Button
                onClick={handleDownload}
                className="w-full flex items-center justify-center mt-6 mb-3 px-4 py-2 text-sm font-medium text-white bg-violet-700 rounded-lg border border-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-violet-300"
              >
                <FiDownload className="h-5 w-5" />
                <span className="ml-2">Download</span>
              </Button>

              <Button className="w-full flex items-center justify-center mt-3 px-4 py-2 text-sm font-medium text-violet-800 bg-transparent rounded-lg border border-violet-700 hover:bg-violet-100 focus:outline-none focus:ring-violet-300">
                <FiBookmark className="h-5 w-5" />
                <span className="ml-2">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 mb-10 bg-white">
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
            {filteredRelatedBooks.map((book) => (
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
