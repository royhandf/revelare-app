import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { signin, signup } from "../utils/fetch";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/books?query=${searchQuery}`;
    }
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
  };

  return (
    <>
      <Navbar
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
      />
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
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Search for books by title, author, or keyword"
              />

              <Button
                className="absolute right-2 top-2 bg-violet-700 text-white px-8 py-2 rounded-full hover:bg-violet-800 transition duration-300"
                text="Search"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
