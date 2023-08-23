import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const Header = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    swal("Are you sure you want to sign out?", {
      buttons: {
        nope: {
          text: "Let me stay",
          value: "nope",
        },
        sure: {
          text: "I'm sure",
          value: "sure",
        },
      },
    }).then((value) => {
      switch (value) {
        case "sure":
          swal("Signed out successfully", "success").then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          });
          break;
        case "nope":
          swal("OK", "success");
          break;
        default:
          swal("Got away safely!");
      }
    });
  };

  return (
    <div>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="../../index3.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-user" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">Menu</span>
            <div className="dropdown-divider" />
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user-alt mr-2" /> Update Profile
            </Link>
            <div className="dropdown-divider" />
            <a
              href="javascript:;"
              onClick={handleLogout}
              className="dropdown-item"
            >
              <i className="fas fa-sign-out-alt mr-2" /> Logout
            </a>
          </div>
        </li>
      </ul>
      {/* Show login component is user is not authenticated */}
        {/* <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul> */}
    </nav>
    </div>
  );
}

export default Header;
