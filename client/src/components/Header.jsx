import React from "react";
import {
  FaUserAlt,
  FaInfo,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
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
      {user ? (
        <>
          <Link to="/feed">
            <h4>ProgrammIn</h4>
          </Link>
          <ul>
            <li>
              <Link to="/feed">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link>
                <AiFillWechat /> Chat
              </Link>
            </li>
            <li>
              <Link>
                <FaUserAlt /> User Page
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <Link to="/">
            <h4>ProgrammIn</h4>
          </Link>{" "}
          <ul>
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
          </ul>
        </>
      )}
    </header>
  );
}

export default Header;
