import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import logo from "../assets/pictures/logo.png";

interface HeaderProps {
  filter?: string;
  setFilter?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ filter, setFilter }) => {
  const navigate = useNavigate();

  return (
    <header className="header-outer">
      <div className="header-inner responsive-wrapper">
        <nav className="header-navigation-logo">
          <a href="/">
            <img src={logo} alt="StopLyfterz Logo" className="header-logo" />
          </a>
        </nav>
        {setFilter && (
          <div className="search-bar">
            <input
              type="text"
              id="searchInput"
              placeholder="Search photos by location..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        )}
        <nav className="header-navigation">
          <a href="/login">Login</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;