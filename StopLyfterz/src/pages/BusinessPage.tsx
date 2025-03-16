import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Dashboard.css';



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
            <header>
                <h1>Business Dashboard</h1>
            </header>
            
            <section>
                <h2>Posted Lyfterz</h2>
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
                <h2>Submit new lyfter</h2>
                <p>
                    <button onClick={() => navigate('/form')}>Create new lyfter card</button>
                </p>
            </section>

        </div>    
    );
};

export default Business;