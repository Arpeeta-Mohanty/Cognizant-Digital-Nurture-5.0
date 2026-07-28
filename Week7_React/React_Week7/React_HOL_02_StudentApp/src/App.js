import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Student Management Portal</h1>
      <div className="pages-wrapper">
        <Home />
        <About />
        <Contact />
      </div>
    </div>
  );
}

export default App;
