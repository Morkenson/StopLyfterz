import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../assets/styles/BusinessPage.css';
import "../assets/styles/Header.css";

interface Post {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface BusinessAccount {
  businessName: string;
  email: string;
  id: number;
}

const Admin: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pendingAccounts, setPendingAccounts] = useState<BusinessAccount[]>([]);
  const navigate = useNavigate();

  const handleAccept = (id: number) => {
    "something";
  };

  const handleDeny = (id: number) => {
    "something aswell";
  };

  return (
    <div>
      <header className="header-outer">
        <div className="header-inner responsive-wrapper">
          <nav className="header-navigation-logo">
            <a href="/">STOPLYFTERZ</a>
          </nav>
          <div className="header-inner">
            <h1>Dashboard</h1>
          </div>
          <nav className="header-navigation">
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Logout</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="main-content responsive-wrapper">
          <h2>Posted People</h2>
          <hr></hr>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id} style={{ marginBottom: "10px" }}>
                  <img
                    src={post.image}
                    alt={post.name}
                    style={{ width: "100px", marginRight: "10px" }}
                  />
                  <strong>{post.name}</strong>
                  <p>{post.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )}

          <h2>Pending Business Accounts</h2>
          <hr></hr>
          {pendingAccounts.length > 0 ? (
            <ul>
              {pendingAccounts.map((account) => (
                <li key={account.id} style={{ marginBottom: "10px" }}>
                  <p>Email: {account.email}</p>
                  <p>Business Name: {account.businessName}</p>
                  <button
                    onClick={() => handleAccept(account.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Accept
                  </button>
                  <button onClick={() => handleDeny(account.id)}>Deny</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending business accounts.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
