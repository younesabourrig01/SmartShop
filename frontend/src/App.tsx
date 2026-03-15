import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import ShowProduct from "./Pages/ShowProduct/ShowProduct";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Profile/Settings";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ManageProducts from "./Pages/Dashboard/ManageProducts/ManageProducts";
import ManageCategories from "./Pages/Dashboard/ManageCategories/ManageCategories";
import Users from "./Pages/Dashboard/ManageUsers/Users";
import DashboardSettings from "./Pages/Dashboard/DashboardSettings";
import Contact from "./Pages/Contact/Contact";
import { UserRoute, AdminRoute } from "./components/ProtectRoutes/ProtectRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ShowProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />
          <Route
            path="/profile/settings"
            element={
              <UserRoute>
                <Settings />
              </UserRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/categories"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <AdminRoute>
                <DashboardSettings />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
