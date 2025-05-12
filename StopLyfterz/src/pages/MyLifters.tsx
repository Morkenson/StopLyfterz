import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEditableLifterCards } from "../components/EditableListCard"; // Import the hook
import logo from "../assets/pictures/logo.png";


const LifterCardsPage: React.FC = () => {
    const [filter, setFilter] = useState("");
    const [email, setEmail] = useState<string | null>(null);

    const navigate = useNavigate();
    
    useEffect(() => {
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error("Auth error:", error);
      setEmail(user?.email ?? null);
    })();
  }, []);
  
    /* 2️⃣  pass email (may be null on first render) */
    const { EditableLifterCardList } = useEditableLifterCards(
      filter,
      email ?? ""
    );
  
    if (!email) {
      /* could show a spinner while we look up the user */
      return <p>Loading user…</p>;
    }
  
    return (
        <div>
        {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <nav className="sidebar-navigation-logo">
            <a href="/business">
              <img src={logo} alt="StopLyfterz Logo" className="sidebar-logo" />
            </a>
          </nav>
          
          <nav className="sidebar-navigation">
            <button onClick={() => navigate("/verify-business-account")}>Verify Your Buisness Account</button>
            <button onClick={() => navigate("/add-card")}>Add Card</button>
            <button onClick={() => navigate("/view-shoplifters")}>View My Shoplifters</button>
            
          </nav>
        </div>
      </aside>

        {/* Main Content */}
        <header className="header-outer">
        <div className="header-inner responsive-wrapper">
        <nav className="header-navigation-logo">
          <a href="/business">
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
        <select
              className="filter"
              
              
            >
              <option value="" disabled selected>
                Filter by...
              </option>
              <option value="City">City</option>
              <option value="State">State</option>
              <option value="ZipCode">Zip Code</option>
            </select>
      </div>
          <nav className="header-navigation">
            <a href="/login">Logout</a>
          </nav>
        </div>
      </header>
        
          <EditableLifterCardList />       
      
    </div>
    )
    
      
  }

export default LifterCardsPage;