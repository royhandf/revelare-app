import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookLists from "../pages/BookLists";
import BookDetail from "../pages/BookDetail";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import PrivateRoute from "../components/PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookLists />} />
      <Route path="/books/:id" element={<BookDetail />} />

      <Route
        path="/dashboard/books"
        element={<PrivateRoute element={<Dashboard />} />}
      />

      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
