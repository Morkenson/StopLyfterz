import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Dashboard.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        "something prob troys job";
    };

    return (
        <div>
            <header>
                <h1>STOPLYFTERZ</h1>
                <button onClick={() => navigate('/')} className='custom-button'>Home Page</button>
            </header>

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button onClick={() => navigate('/register')}>Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
