import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLifterCards } from "../components/ListCard"; // Import the hook
import "../assets/styles/Header.css";
import "../assets/styles/BusinessPage.css";
import logo from "../assets/pictures/logo.png";
import { useEditableLifterCards } from "../components/EditableListCard";

const Business: React.FC = () => {
  const [filter, setFilter] = useState(""); // Filter for the ListCard
  const { LifterCardList } = useLifterCards(filter); // Fetch the ListCard component
  const { EditableLifterCardList } = useEditableLifterCards(filter);
  const navigate = useNavigate();

  return (
    <div >
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <nav className="sidebar-navigation-logo">
            <a href="/">
              <img src={logo} alt="StopLyfterz Logo" className="sidebar-logo" />
            </a>
          </nav>
          
          <nav className="sidebar-navigation">
            <button onClick={() => navigate("/verify-account")}>Verify Your Buisness Account</button>
            <button onClick={() => navigate("/add-card")}>Add Card</button>
            <button onClick={() => navigate("/view-shoplifters")}>View My Shoplifters</button>
            
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      
        <header className="header-outer">
        <div className="header-inner responsive-wrapper">
        <nav className="header-navigation-logo">
          <a href="/">
            <img
              src={logo} 
              alt="StopLyfterz Logo"
              className="header-logo"
            />
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
            <a href="/login">Logout</a>
          </nav>
        </div>
      </header>

       
        
          <EditableLifterCardList />       
      
    </div>
  );
};

export default Business;
