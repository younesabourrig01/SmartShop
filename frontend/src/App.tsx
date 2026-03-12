import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


export default App;

