import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import "../assets/styles/CustomButton.css";

interface Post {
  id: number;
  name: string;
  image: string;
  description: string;
}

const Business: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  interface BoxData {
    src: string;
    alt: string;
    description: string;
  }


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
            
            <section>
                <h2>Posted Lyfterz</h2>
                <hr></hr>
                {posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id} style={{ marginBottom: '10px' }}>
                                <img src={post.image} alt={post.name} style={{ width: '100px', marginRight: '10px' }} />
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
                    <button onClick={() => navigate('/form')} className='custom-button'>Create new lyfter card</button>
                </p>
            </section>

        </div>    
    );
};

export default Business;
