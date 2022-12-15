import React from "react";
import { FaUserAlt, FaInfo, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <h4>ProgrammIn</h4>
      <ul>
        {user ? (
          <li>
            <a onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <Link to="/">
                <FaSignInAlt />
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUserAlt />
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FaInfo />
                About
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
