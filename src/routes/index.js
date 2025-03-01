import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookLists from "../pages/BookLists";
import BookDetail from "../pages/BookDetail";
import Unauthorized from "../pages/error/Unauthorized";
import BookIndex from "../pages/book/Index";
import BookCreate from "../pages/book/Create";
import BookEdit from "../pages/book/Edit";
import UserIndex from "../pages/user/Index";
import UserEdit from "../pages/user/Edit";
import NotFound from "../pages/error/NotFound";
import DashboardLayout from "../components/DashboardLayout";
import Index from "../pages/dashboard/Index";
import Bookmark from "../pages/Bookmark";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookLists />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/bookmarks" element={<Bookmark />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Index />} />

        <Route path="books">
          <Route index element={<BookIndex />} />
          <Route path="create" element={<BookCreate />} />
          <Route path="edit/:id" element={<BookEdit />} />
        </Route>

        <Route path="users">
          <Route index element={<UserIndex />} />
          <Route path="edit/:id" element={<UserEdit />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
