import React from 'react';
import './EmployeeCard.css';

// Department colour map
const deptColors = {
  Engineering: '#667eea',
  Design:      '#f093fb',
  Analytics:   '#4facfe',
  Operations:  '#43e97b',
  Management:  '#fa709a',
  Quality:     '#f6d365',
};

function EmployeeCard({ employee }) {
  const { id, name, role, department, salary } = employee;
  const color = deptColors[department] || '#667eea';

  return (
    <div className="emp-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="emp-avatar" style={{ background: color }}>
        {name.charAt(0)}
      </div>
      <div className="emp-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <div className="tags">
          <span className="tag dept">{department}</span>
          <span className="tag id">ID: {id}</span>
        </div>
        <p className="salary">{salary} / yr</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
