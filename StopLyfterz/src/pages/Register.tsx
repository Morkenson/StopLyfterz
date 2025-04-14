import { signUp } from '../dbController';
import { createProfile } from '../dbController';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const adminList = ['morkzachb@gmail.com'];

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
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
            <h1>Register</h1>
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
    );
};

export default Register;
