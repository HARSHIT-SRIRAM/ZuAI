import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("Token");
    navigate("/blogs");
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="HeaderSearchALigner">
          <div className="header-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="header-clear-button" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
          <button className="header-hamburger" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/blogs" className="header-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/profile" className="header-link" onClick={closeMenu}>
            Profile
          </Link>

          <div className="header-auth">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="header-auth-button">
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="header-auth-button"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
