import "./index.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import More from "./pages/More";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/feed" /> : <Signin />}
            />
            <Route
              path="/about"
              element={user ? <Navigate to="/feed" /> : <About />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/feed" /> : <Signup />}
            />
            <Route
              path="/feed"
              element={user ? <Feed /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id/more"
              element={user ? <More /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id/update"
              element={user ? <ProfileUpdate /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id/followers"
              element={user ? <Followers /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id/followings"
              element={user ? <Followings /> : <Navigate to="/" />}
            />
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
