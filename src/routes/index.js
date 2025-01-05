import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookLists from "../pages/BookLists";
import BookDetail from "../pages/BookDetail";
import Unauthorized from "../pages/error/Unauthorized";
import Index from "../pages/dashboard/Index";
import Create from "../pages/dashboard/Create";
import Edit from "../pages/dashboard/Edit";
import RequireAuth from "./RequireAuth";
import NotFound from "../pages/error/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookLists />} />
      <Route path="/books/:id" element={<BookDetail />} />

      <Route
        path="/dashboard/books"
        element={<RequireAuth element={<Index />} roles={["admin"]} />}
      />
      <Route
        path="/dashboard/books/create"
        element={<RequireAuth element={<Create />} roles={["admin"]} />}
      />
      <Route
        path="/dashboard/books/edit/:id"
        element={<RequireAuth element={<Edit />} roles={["admin"]} />}
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
