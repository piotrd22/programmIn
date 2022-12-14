import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
