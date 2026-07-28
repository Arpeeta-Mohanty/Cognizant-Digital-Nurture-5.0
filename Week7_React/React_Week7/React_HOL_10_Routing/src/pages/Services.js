import React from 'react';
import './Page.css';

const serviceList = ['React Development', 'UI/UX Design', 'Cloud Solutions', 'DevOps Consulting'];

function Services() {
  return (
    <div className="page-container">
      <div className="page-card services">
        <h1>⚙️ Services</h1>
        <ul className="service-list">
          {serviceList.map((s) => <li key={s}>✅ {s}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Services;
