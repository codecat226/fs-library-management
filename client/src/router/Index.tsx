import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Home,
  Register,
  Login,
  ForgotPassword,
  Activate,
  AdminEditProfile,
  UserLibrary,
  UserDashboard,
  AdminLibrary,
  AdminProfile,
  AdminAddBook,
  AdminAuthors,
  AdminSingleBook,
  AdminUpdateBook,
  AdminSingleAuthor,
  AdminShowUsers,
  AdminUpdateAuthor,
  AdminAddAuthor,
  AdminChangePassword,
  AdminDashboard,
  UserSingleBook,
  UserProfile,
  BorrowedBooks,
  UserChangePassword,
  UserEditProfile,
  UserAuthors,
  Donate,
  ProcessDonation,
} from "../pages";
import { ResetPassword } from "pages/users/ResetPassword";
import AdminProtected from "./AdminProtected";
import UserProtected from "./UserProtected";
import { UserSingleAuthor } from "pages/users/UserSingleAuthor";

const Index = () => {
  return (
    <BrowserRouter>
      <ToastContainer style={{ margin: 0 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Home />} />
        <Route path="/dashboard" element={<UserProtected />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/user/profile" element={<UserProfile />} />
          <Route path="/dashboard/user/library" element={<UserLibrary />} />
          <Route path="/dashboard/user/books" element={<BorrowedBooks />} />
          <Route
            path="/dashboard/user/book-data"
            element={<UserSingleBook />}
          />
          <Route
            path="/dashboard/user/change-password"
            element={<UserChangePassword />}
          />
          <Route
            path="/dashboard/user/edit-profile"
            element={<UserEditProfile />}
          />
          <Route path="/dashboard/user/authors" element={<UserAuthors />} />
          <Route
            path="/dashboard/user/author-data"
            element={<UserSingleAuthor />}
          />
          <Route path="/dashboard/user/donate" element={<Donate />} />
          <Route path="/dashboard/user/make-donation" element={<ProcessDonation />} />
        </Route>
        <Route path="/dashboard" element={<AdminProtected />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/library" element={<AdminLibrary />} />
          <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
          <Route
            path="/dashboard/admin/change-password"
            element={<AdminChangePassword />}
          />
          <Route path="/dashboard/admin/authors" element={<AdminAuthors />} />
          <Route path="/dashboard/admin/add-book" element={<AdminAddBook />} />
          <Route
            path="/dashboard/admin/edit-profile"
            element={<AdminEditProfile />}
          />
          <Route
            path="/dashboard/admin/update-book"
            element={<AdminUpdateBook />}
          />
          <Route
            path="/dashboard/admin/add-author"
            element={<AdminAddAuthor />}
          />
          <Route
            path="/dashboard/admin/book-data"
            element={<AdminSingleBook />}
          />
          <Route
            path="/dashboard/admin/author-data"
            element={<AdminSingleAuthor />}
          />
          <Route
            path="/dashboard/admin/update-author"
            element={<AdminUpdateAuthor />}
          />
          <Route path="/dashboard/admin/users" element={<AdminShowUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Index;
