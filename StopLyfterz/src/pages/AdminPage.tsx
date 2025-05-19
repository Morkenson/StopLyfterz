// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import "../assets/styles/Header.css";

import logo from "../assets/pictures/logo.png";
import { useNavigate } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";


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

/* restore body overflow when we leave the admin screen */
function useBodyNoScroll() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalMinH     = document.body.style.minHeight;

    document.body.style.overflow   = "hidden";
    document.body.style.minHeight  = "100vh";

    return () => {
      document.body.style.overflow  = originalOverflow;
      document.body.style.minHeight = originalMinH;
    };
  }, []);
}

/* ---------- component ---------- */
const Admin: React.FC = () => {
  useBodyNoScroll();

  return (
    <div style={styles.shell}>
      {/* ───────── Sidebar ───────── */}
      <aside style={styles.sidebar}>
        <nav className="sidebar-navigation-logo" style={{ padding: "0 1rem" }}>
          <NavLink end to="">
            <img src={logo} alt="StopLyfterz Logo" className="sidebar-logo" />
          </NavLink>
        </nav>

        <nav className="sidebar-navigation">
          <NavLink end   to=""                style={styles.navBtn}>
            Lifters
          </NavLink>
          <NavLink       to="verify-accounts" style={styles.navBtn}>
            Verify Business Accounts
          </NavLink>
        </nav>
      </aside>

      {/* ───────── Header + Main ───────── */}
      <div style={styles.mainWrapper}>
        {/* Header still uses your global CSS classes */}
        <header className="header-outer">
          <div className="header-inner responsive-wrapper">
            <nav className="header-navigation-logo">
              <NavLink end to="/admin">
                <img
                  src={logo}
                  alt="StopLyfterz Logo"
                  className="header-logo"
                />
              </NavLink>
              <h2>Admin Dashboard</h2>
            </nav>

            <nav className="header-navigation">
              <NavLink to="/login">Logout</NavLink>
            </nav>
          </div>
        </header>

        {/* The ONLY scrollable pane */}
        <main style={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
