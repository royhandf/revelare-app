import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setAuthenticated(true);
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticated(false);
    setCurrentUser(null);

    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
