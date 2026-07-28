import React from 'react';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

// Employee data array
const employees = [
  { id: 101, name: 'Ananya Krishnan',  role: 'Software Engineer',    department: 'Engineering',  salary: '₹8,50,000' },
  { id: 102, name: 'Rohan Mehta',      role: 'UI/UX Designer',       department: 'Design',       salary: '₹7,20,000' },
  { id: 103, name: 'Sneha Patel',      role: 'Data Analyst',         department: 'Analytics',    salary: '₹9,00,000' },
  { id: 104, name: 'Vikram Singh',     role: 'DevOps Engineer',      department: 'Operations',   salary: '₹10,50,000' },
  { id: 105, name: 'Meera Iyer',       role: 'Product Manager',      department: 'Management',   salary: '₹12,00,000' },
  { id: 106, name: 'Arjun Das',        role: 'QA Engineer',          department: 'Quality',      salary: '₹6,80,000' },
];

function EmployeeList() {
  return (
    <div className="list-container">
      <p className="list-info">Total Employees: <strong>{employees.length}</strong></p>
      {/* map() with unique key prop */}
      <div className="cards-grid">
        {employees.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
