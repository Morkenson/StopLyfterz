import React, { useState,useEffect,  useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLifterCards } from "../components/ListCard"; // Import the hook
import "../assets/styles/Header.css";
import "../assets/styles/BusinessPage.css";
import logo from "../assets/pictures/logo.png";
import checkIcon from "../assets/pictures/verifiedg.png";
import checkIcon2 from "../assets/pictures/nog.png";
import { useEditableLifterCards } from "../components/EditableListCard";
import {getVerified} from '../dbController';
import { supabase } from "../supabaseClient";

export type FilterType = "City" | "State" | "ZipCode";

const Business: React.FC = () => {
  const [filter, setFilter] = useState(""); // Filter for the ListCard
  var [filterType, setFilterType] = useState<FilterType>("City");
  const { LifterCardList } = useLifterCards(filter, filterType);
  const [email, setEmail] = useState<string | null>(null);
   // Fetch the ListCard component
  //const { EditableLifterCardList } = useEditableLifterCards(filter);
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

    const stableGetVerified = useCallback(getVerified, []);

const [isVerified, setIsVerified] = useState<boolean | null>(null);

/* ignore second invoke in React‑18 dev double‑mount */
const fetchedRef = useRef(false);

useEffect(() => {
  if (!email || fetchedRef.current) return;

  fetchedRef.current = true;           // run only once per mount
  stableGetVerified(email)
    .then(setIsVerified)
    .catch(() => setIsVerified(false));
}, [email, stableGetVerified]);

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterType(e.target.value as FilterType);
    };

    console.log("isVerified", isVerified);

  return (
    <div >
      {/* Sidebar */}
      <aside className="sidebar">
    

        <div className="sidebar-inner">
          {isVerified !== null && (                   /* hide while loading */
            <div className="verify-status">
              {isVerified ? (
                <>
                  <img src={checkIcon} alt="Verified account" className="verify-badge" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <img src={checkIcon2} alt="Verified account" className="verify-badge" />
                  <span>Not Verified</span>
                </>
                
              )}
            </div>
          )}
          
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
              value={filterType}
              onChange={handleFilterTypeChange}
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
        
          <LifterCardList />       
      
    </div>
  );
};

export default Business;
