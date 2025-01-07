import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { useState } from "react";

const DashboardLayout = () => {
  const { isAuthenticated, currentUser, handleLogout } = useAuth();
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return (window.location.href = "/unauthorized");
  }

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        isDropdownMenuOpen={isDropdownMenuOpen}
        toggleDropdownMenu={() => setDropdownMenuOpen(!isDropdownMenuOpen)}
        handleLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
