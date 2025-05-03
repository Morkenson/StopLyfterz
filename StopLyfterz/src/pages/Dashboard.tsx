import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLifterCards } from "../components/ListCard"; // Import the hook
import "../assets/styles/Dashboard.css";
import "../assets/styles/Header.css";
import logo from "../assets/pictures/logo.png";

interface BoxData {
  src: string;
  alt: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Get the pre-rendered component from the hook
  const { LifterCardList } = useLifterCards(filter);

  return (
    <div>
      <header className="header-outer">
        <div className="header-inner responsive-wrapper">
          <nav className="header-navigation-logo">
            <a href="/">
              <img src={logo} alt="StopLyfterz Logo" className="header-logo" />
            </a>
          </nav>
          <div className="search-bar">
            <input
              type="text"
              id="searchInput"
              placeholder="Search photos by location..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <nav className="header-navigation">
            <a href="/login">Login</a>
          </nav>
        </div>
      </header>

      <LifterCardList />
    </div>
  );
};

export default Dashboard;
