import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

// Parent Component — passes props to StudentCard (Child)
function App() {
  const students = [
    { id: 1, name: 'Arjun Sharma',   rollNumber: 'CS2401', department: 'Computer Science' },
    { id: 2, name: 'Priya Nair',     rollNumber: 'EC2402', department: 'Electronics' },
    { id: 3, name: 'Rahul Verma',    rollNumber: 'ME2403', department: 'Mechanical' },
  ];

  return (
    <div className="app-container">
      <h1 className="main-title">Student Details — Props Demo</h1>
      <div className="cards-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            rollNumber={student.rollNumber}
            department={student.department}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
