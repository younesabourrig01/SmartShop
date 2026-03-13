import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import ShowProduct from "./Pages/ShowProduct/ShowProduct";
import Profile from "./Pages/Profile/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { UserRoute, AdminRoute } from "./components/ProtectRoutes/ProtectRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ShowProduct />} />
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
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
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
