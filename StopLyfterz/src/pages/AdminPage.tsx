// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import "../assets/styles/Header.css";
import {
  fetchPendingBusinessAccounts,
  approveBusinessAccount,
  rejectBusinessAccount,
  Profile,
} from '../AdminController';
import logo from "../assets/pictures/logo.png";


const Admin: React.FC = () => {
  const [pendingAccounts, setPendingAccounts] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function loadPending() {
      try {
        const profiles = await fetchPendingBusinessAccounts();
        setPendingAccounts(profiles);
      } catch (err: any) {
        setError(err.message);
      }
    }
    loadPending();
  }, []);

  const handleApprove = async (email: string) => {
    try {
      await approveBusinessAccount(email);
      setPendingAccounts(pendingAccounts.filter((acc) => acc.Email !== email));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReject = async (email: string) => {
    try {
      await rejectBusinessAccount(email);
      setPendingAccounts(pendingAccounts.filter((acc) => acc.Email !== email));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
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
        
          <nav className="header-navigation">
            <a href="/login">Logout</a>
          </nav>
        </div>
      </header>
      
    <div style={{ padding: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <h2>Pending Business Accounts</h2>
        {pendingAccounts.length > 0 ? (
          <ul>
            {pendingAccounts.map((account) => (
              <li key={account.Email} style={{ marginBottom: '10px' }}>
                <p>Email: {account.Email}</p>
                <p>Level: {account.Level}</p>
                <button
                  onClick={() => handleApprove(account.Email)}
                  style={{ marginRight: '10px' }}
                >
                  Approve
                </button>
                <button onClick={() => handleReject(account.Email)}>
                  Reject
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending business accounts.</p>
        )}
      </section>
    </div>
    </div>
  );
};

export default Admin;
