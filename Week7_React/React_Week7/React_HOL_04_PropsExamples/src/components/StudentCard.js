import React from 'react';
import './StudentCard.css';

// Child Component — receives and displays props
function StudentCard({ name, rollNumber, department }) {
  return (
    <div className="student-card">
      <div className="card-header">
        <span className="avatar">{name.charAt(0)}</span>
        <h2>{name}</h2>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="label">Roll Number</span>
          <span className="value">{rollNumber}</span>
        </div>
        <div className="info-row">
          <span className="label">Department</span>
          <span className="value">{department}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
