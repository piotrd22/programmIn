import React from "react";
import { FaUserAlt, FaInfo, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h4>ProgrammIn</h4>
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
    </header>
  );
}

export default Header;
