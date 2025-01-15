import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

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

  const toggleDropdownMenu = () => {
    setDropdownMenuOpen((prev) => !prev);
  };

  const handleLogin = (user, token) => {
    setItem("token", token);
    setItem("user", user);
    setAuthenticated(true);
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        isDropdownMenuOpen,
        toggleDropdownMenu,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
