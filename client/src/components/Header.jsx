import React from "react";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h4>ProgrammIn</h4>
      <ul>
        <li>
          <Link to="/">
            <FaHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/signin">
            <GoSignIn />
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <FaUserAlt />
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
