import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Dashboard.css';


const Dashboard: React.FC = () => {
    
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
    interface BoxData {
        src: string;
        alt: string;
        description: string;
    }

    // Array of boxes (you can later fetch this data from database)
    const boxes: BoxData[] = [
        { src: 'images/photo1.jpg', alt: 'Photo 1', description: 'Platteville, WI' }
    ];

    const filteredBoxes = boxes.filter((box) =>
        box.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <header>
                <h1>STOPLYFTERZ</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Search photos by location..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/admin')}>AdminPageForTesting</button>
            </header>
            <div className="container">
                {filteredBoxes.map((box, index) => (
                    <div className="box" key={index}>
                        <div className="box-content">
                            <img src={box.src} alt={box.alt} />
                        </div>
                        <div className="description">{box.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;