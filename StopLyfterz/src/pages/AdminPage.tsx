// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import "../assets/styles/Header.css";
import {
  fetchPendingBusinessAccounts,
  approveBusinessAccount,
  denyBusinessAccount,
  Profile
} from '../AdminController';

const Admin: React.FC = () => {
  const [pendingAccounts, setPendingAccounts] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch pending accounts when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const pending = await fetchPendingBusinessAccounts();
        setPendingAccounts(pending);
      } catch (err: any) {
        setError('Error fetching pending accounts.');
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // Handler for approving a business account
  const handleApprove = async (id: string) => {
    try {
      await approveBusinessAccount(id);
      setPendingAccounts(pendingAccounts.filter(account => account.id !== id));
    } catch (err: any) {
      console.error('Error approving account:', err);
      setError('Error approving account.');
    }
  };

  // Handler for denying a business account
  const handleDeny = async (id: string) => {
    try {
      await denyBusinessAccount(id);
      setPendingAccounts(pendingAccounts.filter(account => account.id !== id));
    } catch (err: any) {
      console.error('Error denying account:', err);
      setError('Error denying account.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <header className="header-outer">
        <div className="header-inner responsive-wrapper">
          <nav className="header-navigation-logo">
            <a href="/">STOPLYFTERZ</a>
          </nav>
          <div className="header-inner">
            <h1>Dashboard</h1>
          </div>
          <nav className="header-navigation">
            <a href="/login">Login</a>
          </nav>
        </div>
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <section>
        <h2>Pending Business Accounts</h2>
        {pendingAccounts.length > 0 ? (
          <ul>
            {pendingAccounts.map(account => (
              <li key={account.id} style={{ marginBottom: '10px' }}>
                <p>Email: {account.email}</p>
                <p>Role: {account.role}</p>
                <button onClick={() => handleApprove(account.id)} style={{ marginRight: '10px' }}>
                  Approve
                </button>
                <button onClick={() => handleDeny(account.id)}>Deny</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending business accounts.</p>
        )}
      </section>
    </div>
  );
};

export default Admin;
