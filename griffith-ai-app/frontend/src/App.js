import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './assets/griffith-logo.webp';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="header">
        <h1><img src={logo} alt="Griffith Logo" className="logo" />Griffith AI</h1>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate('/login')}>Login / Register</button>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/login" element={
          <Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />
        } />
        <Route path="/" element={
          <Chat username={username} />
        } />
      </Routes>

      <footer>
        © 2025 Griffith AI — Project by Luna Grandjean and Maia Jouenne
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
