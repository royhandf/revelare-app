import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "../utils/storage";
import { signin, signup } from "../utils/fetch";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogout = () => {
    removeItem("token");
    removeItem("user");
    setAuthenticated(false);
    setCurrentUser(null);
    setDropdownMenuOpen(false);

    window.location.href = "/";
  };

  useEffect(() => {
    const token = getItem("token");
    const user = getItem("user");

    if (token && user) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
          return;
        }

        setAuthenticated(true);
        setCurrentUser(user);
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const toggleDropdownMenu = () => setDropdownMenuOpen((prev) => !prev);
  const toggleSignInModal = () => setSignInModalOpen((prev) => !prev);
  const toggleSignUpModal = () => setSignUpModalOpen((prev) => !prev);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(authForm);
      if (response.status === "success") {
        setItem("token", response.token);
        setItem("user", response.user);
        setAuthenticated(true);
        setCurrentUser(response.user);
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
        setItem("token", response.token);
        setItem("user", response.user);
        setAuthenticated(true);
        setCurrentUser(response.user);
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        authForm,
        isDropdownMenuOpen,
        isSignInModalOpen,
        isSignUpModalOpen,
        toggleDropdownMenu,
        toggleSignInModal,
        toggleSignUpModal,
        handleAuthInputChange,
        handleSignUpSubmit,
        handleSignInSubmit,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
