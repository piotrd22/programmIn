import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

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
            <Route path="/feed" element={<Feed />} />
            <Route
              path="*"
              element={<NotFound data={window.location.href} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
