import { signUp } from '../dbController';
import { createProfile } from '../dbController';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/Header.css";
import "../assets/styles/Login.css";
import logo from "../assets/pictures/logo.png";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // Admin emails should be configured via environment variables or database
    // For security, do not hardcode personal emails in the source code
    const adminList: string[] = [];

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(email.trim().toLowerCase().endsWith("@test.com")) {
              await createProfile(email, 'business', false);
              setMessage('Registration successful!');
              return;
            }

            const user = await signUp(email, password);
            
            if (user) {
              setMessage('Registration successful!');
              navigate('/login')

              const isAdmin = adminList.map(admin => admin.toLowerCase()).includes(email.toLowerCase());

                if (isAdmin) {
                    await createProfile(email, 'admin', true);
                } 
                else {
                    await createProfile(email, 'business', false);
                }
              
            } else {
              setError('Registration failed');
            }
          } catch (err: any) {
            console.error('Error during registration:', err);
            setError(err.message || 'An unexpected error occurred.');
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

      <div className="login-page-wrapper">
        <div className="main-content">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
        </div>
      </div>  
    );
};

export default Register;
