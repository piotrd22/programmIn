import React from "react";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { FaUserAlt, FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h4>ProgrammIn</h4>
      <ul>
        <li>
          <Link to="/">
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
