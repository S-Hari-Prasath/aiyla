import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpg"; // gift shop logo

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Change navbar style when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Gift Haven" />
      </div>

      {/* Hamburger Menu */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li className={`dropdown ${dropdownOpen ? "active" : ""}`}>
          <span onClick={toggleDropdown} className="dropdown-toggle">
            Shop <span className={`arrow ${dropdownOpen ? "rotate" : ""}`}>▾</span>
          </span>
          <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <li>
              <Link to="/gifts" onClick={closeMenu}>
                Gifts
              </Link>
            </li>
            <li>
              <Link to="/flowers" onClick={closeMenu}>
                Flowers
              </Link>
            </li>
            <li>
              <Link to="/cakes" onClick={closeMenu}>
                Cakes
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
