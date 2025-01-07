import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookLists from "../pages/BookLists";
import BookDetail from "../pages/BookDetail";
import Unauthorized from "../pages/error/Unauthorized";
import Index from "../pages/dashboard/Index";
import Create from "../pages/dashboard/Create";
import Edit from "../pages/dashboard/Edit";
import NotFound from "../pages/error/NotFound";
import DashboardLayout from "../components/DashboardLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookLists />} />
      <Route path="/books/:id" element={<BookDetail />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="books">
          <Route index element={<Index />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
