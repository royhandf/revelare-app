import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarWithSearch from "./NavbarWithSearch";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavbarWithSearch />
      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
