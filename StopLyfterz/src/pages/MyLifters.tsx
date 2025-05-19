import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEditableLifterCards } from "../components/EditableListCard"; // Import the hook
import logo from "../assets/pictures/logo.png";
import "../assets/styles/Header.css";
import { Outlet, NavLink } from "react-router-dom";


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
    const styles = {
      shell: {
        position: "fixed",      // lock to viewport
        inset: 0,
        display: "flex",
        overflow: "hidden",     // prevent a 2nd scrollbar inside shell
      } as React.CSSProperties,
    
      sidebar: {
        width: 240,
        flexShrink: 0,
        background: "#2e2e2e",
        color: "#fff",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 0",
      } as React.CSSProperties,
    
      mainWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
      } as React.CSSProperties,
    
      mainContent: {
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%",
      } as React.CSSProperties,
    
      /* tidy sidebar buttons */
      navBtn: {
        display: "block",
        padding: "0.75rem 1rem",
        color: "#fff",
        textDecoration: "none",
        fontSize: "1rem",
      } as React.CSSProperties,
    };
  
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
    <div style={styles.mainWrapper}>
        {/* Header still uses your global CSS classes */}
        <header className="header-outer">
          <div className="header-inner responsive-wrapper">
            <nav className="header-navigation-logo">
              <NavLink end to="/business">
                <img
                  src={logo}
                  alt="StopLyfterz Logo"
                  className="header-logo"
                />
              </NavLink>
              <h2>My Lifters</h2>
            </nav>

            <nav className="header-navigation">
              <NavLink to="/login">Logout</NavLink>
            </nav>
          </div>
        </header>
          
          <EditableLifterCardList />       
      
        </div>
      </div>
    );
  }

export default LifterCardsPage;