import Navbar from "./components/Partials/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
