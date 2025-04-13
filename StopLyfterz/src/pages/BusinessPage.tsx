import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Header.css';


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
        <div>
            <header className="header-outer">
	            <div className="header-inner responsive-wrapper">
                    <h1><button onClick={() => navigate('/')} className='text-button'>STOPLYFTERZ</button></h1>
                    <div className='header-inner'>
                        <h2>Business Dashboard</h2>
                    </div>
		            <nav className="header-navigation">
			            <a href="#">Logout</a>
		            </nav>
	            </div>
            </header>
            
            <main className="main">
            <div className="main-content responsive-wrapper">
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

                <h2>Pending Lyfterz</h2>
                <hr></hr>
                <p>No Lyfterz pending.</p>

                <h2>Submit New Lyfter</h2>
                <hr></hr>
                <p>
                    <button onClick={() => navigate('/form')} className='custom-button'>Create new lyfter card</button>
                </p>
            </div>     
            </main>   
        </div>    
    );
};

export default Business;