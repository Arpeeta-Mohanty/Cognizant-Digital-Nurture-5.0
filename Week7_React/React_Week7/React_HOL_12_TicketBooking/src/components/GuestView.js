import React from 'react';
import './Views.css';

// Shown when user is NOT logged in
function GuestView() {
  const flights = [
    { id: 1, from: 'Delhi',   to: 'Mumbai',    time: '06:00 AM', price: '₹4,500' },
    { id: 2, from: 'Chennai', to: 'Bangalore',  time: '09:30 AM', price: '₹2,800' },
    { id: 3, from: 'Kolkata', to: 'Hyderabad',  time: '01:15 PM', price: '₹5,200' },
  ];

  return (
    <div className="view-container">
      <div className="info-banner guest-banner">
        <h2>👤 Guest User</h2>
        <p>You can <strong>view available flights</strong> but must <strong>login to book tickets</strong>.</p>
      </div>
      <h3 className="section-title">Available Flights</h3>
      <div className="flights-list">
        {flights.map((f) => (
          <div key={f.id} className="flight-card">
            <div className="route">{f.from} → {f.to}</div>
            <div className="details">
              <span>🕐 {f.time}</span>
              <span>💰 {f.price}</span>
            </div>
            <button className="book-btn disabled" disabled>
              🔒 Login to Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestView;
