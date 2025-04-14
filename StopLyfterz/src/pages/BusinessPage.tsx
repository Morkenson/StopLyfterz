import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import "../assets/styles/CustomButton.css";
import "../assets/styles/Header.css";
import logo from "../assets/pictures/logo.png";

interface Post {
  id: number;
  name: string;
  image: string;
  description: string;
}

const Business: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  interface BoxData {
    src: string;
    alt: string;
    description: string;
  }


  return (
    <div >
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

      <div  style={{ padding: '20px' }}>
        <section>
        <h2>Posted Lyfterz</h2>
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
      </section>

            <section>
                <h2>Pending Lyfterz</h2>
                <hr></hr>
                <p>No Lyfterz pending.</p>
            </section>

      <section>
        <h2>Submit New Lyfter</h2>
        <hr></hr>
        <p>
          <button onClick={() => navigate("/add-card")} className="custom-button">
            Create new lyfter card
          </button>
        </p>
      </section>
    </div>
    </div>
  );
};

export default Business;
