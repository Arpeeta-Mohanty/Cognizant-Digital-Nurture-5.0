import React, { useState } from 'react';
import GuestView from './components/GuestView';
import UserView from './components/UserView';
import './App.css';

function App() {
  // isLoggedIn state drives conditional rendering
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Flight Ticket Booking</h1>
        <div className="auth-status">
          <span className={`status-badge ${isLoggedIn ? 'logged-in' : 'guest'}`}>
            {isLoggedIn ? '🟢 Logged In' : '🔴 Guest'}
          </span>
          <button
            className={`auth-btn ${isLoggedIn ? 'logout' : 'login'}`}
            onClick={() => setIsLoggedIn((prev) => !prev)}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Conditional Rendering based on login state */}
        {isLoggedIn ? <UserView /> : <GuestView />}
      </main>
    </div>
  );
}

export default App;
