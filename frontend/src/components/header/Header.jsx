import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDropDown, ArrowDropUp, Close, Person, Menu, Search, Compare, Favorite, CardTravel, ShoppingBag, ShoppingBagOutlined, ShoppingCartCheckout, Message } from "@mui/icons-material";
import swal from "sweetalert";

import { Navbar } from "../index";
import { setLogout } from "../../State/auth/authSlice";
import "./Header.scss";
import { Badge, IconButton } from "@mui/material";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);
//   const [showNav, setShowNav] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isDropdownActive, setIsDropdownActive] = useState(false); // State variable for the active class

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//     console.log("Dropdown Toggled: ", showDropdown);

//     // Toggle the active class
//     setIsDropdownActive(!isDropdownActive);
//   };

//   const closeDropdown = () => {
//     setShowDropdown(false);
//   };

//   const removeActive = () => {
//     setShowNav(false);

//     // Remove the active class
//     setIsDropdownActive(false);
//   };

//   const handleLogout = () => {
//     swal("Are you sure you want to sign out?", {
//       buttons: {
//         nope: {
//           text: "Let me stay",
//           value: "nope",
//         },
//         sure: {
//           text: "I'm sure",
//           value: "sure",
//         },
//       },
//     }).then((value) => {
//       switch (value) {
//         case "sure":
//           swal("Signed out successfully", "success").then(() => {
//             localStorage.removeItem("token");
//             navigate("/login");
//           });
//           break;
//         case "nope":
//           swal("OK", "success");
//           break;
//         default:
//           swal("Got away safely!");
//       }
//     });
//   };

//   return (
//     <div>
//       <nav className={`navbar ${styles.navbar}`}>
//         {/* Left navbar links */}
//         <div className="container">
//           <div className="logo">
//             <Link to="/" className="simple-text logo-normal">
//               <h3>Home</h3>
//             </Link>
//           </div>

//           <div className={`${styles.hamburger} ${showNav ? styles.active : ''}`}  onClick={toggleNav}>
//             <span className={`${styles.bar}`}></span>
//             <span className={`${styles.bar}`}></span>
//             <span className={`${styles.bar}`}></span>
//           </div>

//           {/* Right navbar links */}
//           <div className='nav-elements'>
//             <ul className={`${styles.navMenu} ${showNav ? styles.active : ''}`}>
//               <li className="nav-item">
//                 <a className="nav-link" data-widget="pushmenu" href="#">
//                   <i className="fas fa-bars" />
//                 </a>
//               </li>
//               <li className={removeActive}>
//                 <Link to="/dashboard" className={`nav-link ${styles.navLink}`}>
//                   Dashboard
//                 </Link>
//               </li>
//               <li className={removeActive}>
//                 <Link to="/contact" className={`nav-link ${styles.navLink}`}>
//                   Contact
//                 </Link>
//               </li>
//             </ul>

//             {/* SEARCH FORM */}
//             <form className="search-form">
//               {/* Search form content */}
//             </form>

//             {/* User dropdown */}
//             <div className={`nav-elements ${showNav ? "show" : ""}`}>
//             <ul className={`${styles.navMenu}`}>
//               <li className={`nav-item dropdown ${isDropdownActive ? "show" : ""}`}>
//                 <div
//                   className={`nav-link ${isDropdownActive ? "active" : ""}`}
//                   onClick={toggleDropdown}
//                   href="#"
//                 >
//                   <Person />
//                   {isDropdownActive ? <ArrowDropUp /> : <ArrowDropDown />}
//                   </div>
//                   <div className={`dropdownContent ${isDropdownActive ? "show" : ""}`}>
//                   <span className={styles.dropdownHeader}>Menu</span>
//                   <div className={styles.dropdownDivider}></div>
//                   <Link to="/profile" className={styles.dropdownItem}>
//                     <i className="fas fa-user-alt mr-2" /> Update Profile
//                   </Link>
//                   <div className={styles.dropdownDivider}></div>
//                   <a
//                     href="javascript:;"
//                     onClick={handleLogout}
//                     className={styles.dropdownItem}
//                   >
//                     <i className="fas fa-sign-out-alt mr-2" /> Logout
//                   </a>
//                 </div>
//                 {/* </a>
//                 <div
//                   className={`dropdown-menu ${showDropdown ? "show" : ""}`}
//                 >
//                   <span className="dropdown-item dropdown-header">Menu</span>
//                   <div className="dropdown-divider" />
//                   <Link to="/profile" className="dropdown-item">
//                     <i className="fas fa-user-alt mr-2" /> Update Profile
//                   </Link>
//                   <div className="dropdown-divider" />
//                   <a
//                     href="javascript:;"
//                     onClick={handleLogout}
//                     className="dropdown-item"
//                   >
//                     <i className="fas fa-sign-out-alt mr-2" /> Logout
//                   </a>
//                 </div> */}
//               </li>
//             </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

const Header = () => {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
    setIsSignedIn(false);
  };

  return (
    <div>
      <header>
        <div className="nav-container">
          <a href="/" className="logo">
            <h3>Shop Eye</h3>
          </a>
          <Navbar />
        </div>
      </header>
      <div className="second-layer">
        <div className="second-layer-icons">
          <div className="text-icons icons-left">
            <Link className="link">
              <Compare className="icon" />
              <p>
                Compare <br /> Products
              </p>
            </Link>
          </div>
          <div className="text-icons icons-left">
            <Link className="link">
              <Favorite className="icon" />
              <p>
                Favourite <br /> Products
              </p>
            </Link>
          </div>
          <div className="text-icons icons-left">
            <Link className="link">
              <Person className="icon" />
              <p>
                Account <br /> Settings
              </p>
            </Link>
          </div>
          
          
        </div>

        <div className="container">
            <div className="search">
              <input
                type="text"
                className="search-term"
                placeholder="What are you looking for?"
                aria-label="What are you looking for?"
              />
              <span className="searchButton">
                <Search />
              </span>
            </div>
           </div>
           
        <div className="text-icons icons-right">
            <Link className="link cart-badge">
              <Badge badgeContent={1} color="error" sx={{
                '& .MuiBadge-badge': {
                  right: -6,
                  top: 4,
                  // border: `2px solid ${'white'}`,
                  // padding: '0 4px',
                },
              }}>
                <ShoppingCartCheckout color="action" className="badge-icon" />
              </Badge>
              <p>
                ₵ 0.00
              </p>
            </Link>
          </div>
          <div className="text-icons icons-right">
            <Link className="link cart-badge">
              <Badge badgeContent={1} color="warning" sx={{
                '& .MuiBadge-badge': {
                  right: -6,
                  top: 4,
                  // border: `2px solid ${'white'}`,
                  // padding: '0 4px',
                },
              }}>
                <Message color="action" className="badge-icon" />
              </Badge>
              <p>
                Messages
              </p>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Header;
