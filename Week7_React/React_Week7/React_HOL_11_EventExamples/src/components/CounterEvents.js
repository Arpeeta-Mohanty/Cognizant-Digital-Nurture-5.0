import React, { useState } from 'react';
import './CounterEvents.css';

function CounterEvents() {
  const [count, setCount]     = useState(0);
  const [message, setMessage] = useState('');
  const [syntheticMsg, setSyntheticMsg] = useState('');

  // Method 1: Increase counter
  const increaseCounter = () => setCount((prev) => prev + 1);

  // Method 2: Say hello
  const sayHello = () => setMessage('Hello! Welcome to React Events');

  // Increment button calls BOTH methods
  const handleIncrement = () => {
    increaseCounter();
    sayHello();
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    setMessage('');
  };

  // Passing argument via arrow function
  const sayWelcome = (word) => setMessage(`${word} to React!`);

  // Synthetic Event demo
  const handleSyntheticClick = (e) => {
    setSyntheticMsg(
      `Synthetic Event — Type: ${e.type} | Target: ${e.target.tagName} | TimeStamp: ${Math.round(e.timeStamp)}ms`
    );
  };

  return (
    <div className="event-card">
      <h2>Counter with Events</h2>

      <div className="count-display">{count}</div>

      {message && <p className="message-box">{message}</p>}

      {/* Increment calls increaseCounter() + sayHello() */}
      <div className="btn-row">
        <button className="btn btn-green" onClick={handleIncrement}>
          ➕ Increment (calls 2 methods)
        </button>
        <button className="btn btn-red" onClick={handleDecrement}>
          ➖ Decrement
        </button>
      </div>

      {/* Pass argument via arrow function */}
      <div className="btn-row">
        <button className="btn btn-blue" onClick={() => sayWelcome('Welcome')}>
          Say Welcome (pass argument)
        </button>
      </div>

      {/* Synthetic Event */}
      <div className="btn-row">
        <button className="btn btn-purple" onClick={handleSyntheticClick}>
          I was clicked (Synthetic Event)
        </button>
      </div>

      {syntheticMsg && <p className="synthetic-box">{syntheticMsg}</p>}
    </div>
  );
}

export default CounterEvents;
