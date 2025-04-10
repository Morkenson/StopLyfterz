import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import { useLifterCards } from "../components/ListCard"; // Import the hook

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  
  // Get the pre-rendered component from the hook
  const { LifterCardList } = useLifterCards(filter);

  return (
    <div>
      <header>
        <h1>STOPLYFTERZ</h1>
        <div className="search-bar">
          <input
            type="text"
            id="searchInput"
            placeholder="Search photos by location..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button onClick={() => navigate("/login")}>BusinessLogin</button>
        <button onClick={() => navigate("/admin")}>AdminPageForTesting</button>
        <button onClick={() => navigate("/business")}>BusinessPageForTesting</button>
      </header>

      
      <LifterCardList />
    </div>
  );
};

export default Dashboard;
