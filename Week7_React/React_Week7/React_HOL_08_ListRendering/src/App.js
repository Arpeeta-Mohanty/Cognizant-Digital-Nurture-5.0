import React from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="main-title">Employee List — Lists &amp; Keys</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
