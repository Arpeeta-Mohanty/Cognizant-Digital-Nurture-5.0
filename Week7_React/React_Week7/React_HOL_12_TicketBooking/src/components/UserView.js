import React, { useState } from 'react';
import './Views.css';

// Shown when user IS logged in
function UserView() {
  const [booked, setBooked] = useState(null);

  const flights = [
    { id: 1, from: 'Delhi',   to: 'Mumbai',    time: '06:00 AM', price: '₹4,500' },
    { id: 2, from: 'Chennai', to: 'Bangalore',  time: '09:30 AM', price: '₹2,800' },
    { id: 3, from: 'Kolkata', to: 'Hyderabad',  time: '01:15 PM', price: '₹5,200' },
  ];

  return (
    <div className="view-container">
      <div className="info-banner user-banner">
        <h2>✅ Logged In User</h2>
        <p>You can <strong>view and book</strong> available flights.</p>
      </div>

      {booked && (
        <div className="booking-confirm">
          🎉 Ticket Booked! <strong>{booked.from} → {booked.to}</strong> at {booked.time} for {booked.price}
        </div>
      )}

      <h3 className="section-title">Available Flights</h3>
      <div className="flights-list">
        {flights.map((f) => (
          <div key={f.id} className="flight-card">
            <div className="route">{f.from} → {f.to}</div>
            <div className="details">
              <span>🕐 {f.time}</span>
              <span>💰 {f.price}</span>
            </div>
            <button className="book-btn active" onClick={() => setBooked(f)}>
              🎫 Book Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserView;
