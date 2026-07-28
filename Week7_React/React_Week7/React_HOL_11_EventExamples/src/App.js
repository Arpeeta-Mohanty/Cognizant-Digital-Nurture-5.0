import React from 'react';
import CounterEvents from './components/CounterEvents';
import CurrencyConvertor from './components/CurrencyConvertor';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="main-title">React Events — HOL 11</h1>
      <CounterEvents />
      <CurrencyConvertor />
    </div>
  );
}

export default App;
