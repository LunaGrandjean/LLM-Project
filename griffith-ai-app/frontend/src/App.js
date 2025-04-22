// App.js (updated for homepage routing and Griffith.ie style)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './assets/griffith-white.png';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <h1>Welcome to Griffith AI</h1>
        <p>Your virtual guide to Griffith College information.</p>
        <button onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname === '/chat') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="app">
      <header className="griffith-header">
        <h1 className="griffith-title">
          <img src={logo} alt="Griffith Logo" className="griffith-logo" />
          Griffith AI
        </h1>
        <div className="header-right">
          {isLoggedIn ? (
            <button className="griffith-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="griffith-btn" onClick={() => navigate('/login')}>Login / Register</button>
          )}
        </div>
      </header>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/chat" element={isLoggedIn ? <Chat username={username} /> : <HomePage />} />
      </Routes>

      <footer className="griffith-footer">
        <div className="container">
          © 2025 Griffith AI — Project by Luna Grandjean and Maia Jouenne
        </div>
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}