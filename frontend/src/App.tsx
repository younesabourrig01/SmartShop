import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
