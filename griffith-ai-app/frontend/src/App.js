// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f7f8fa', minHeight: '100vh' }}>
      <header style={{ padding: '20px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Griffith AI <span role="img" aria-label="chat">💬</span></h1>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          ) : (
            <button onClick={() => setShowLogin(!showLogin)} style={{ padding: '0.5rem 1rem', borderRadius: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', cursor: 'pointer' }}>
              {showLogin ? 'Continue as Guest' : 'Login / Register'}
            </button>
          )}
        </div>
      </header>
      <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        {showLogin && !isLoggedIn ? (
          <Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Chat username={isLoggedIn ? username : 'guest'} />
        )}
      </main>
    </div>
  );
}

export default App;
