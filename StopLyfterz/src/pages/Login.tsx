import { login } from "../dbController";
import { getAccountRole } from "../dbController";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../assets/styles/Dashboard.css";
import "../assets/styles/Login.css";
import logo from "../assets/pictures/logo.png";
//import "../assets/styles/Header.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const user = await login(email, password);
      if (user) {
        setMessage("Registration successful!");

        const level = await getAccountRole(email);

        if (level == "admin") {
          navigate("/admin");
        } else {
          navigate("/business");
        }
      } else {
        setError("Login failed");
      }
    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

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
    
    <div className="login-page-wrapper">
      <div className="main-content">
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
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default Login;
