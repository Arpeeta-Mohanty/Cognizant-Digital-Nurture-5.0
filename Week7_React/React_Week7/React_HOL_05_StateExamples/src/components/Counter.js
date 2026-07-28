import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  // useState hook manages the counter state
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset     = () => setCount(0);

  // Determine color based on count value
  const countColor = count > 0 ? '#2e7d32' : count < 0 ? '#c62828' : '#333';

  return (
    <div className="counter-card">
      <h2>Counter</h2>

      {/* Display current count */}
      <div className="count-display" style={{ color: countColor }}>
        {count}
      </div>

      <p className="count-label">Current Count</p>

      {/* Control buttons */}
      <div className="btn-group">
        <button className="btn btn-increment" onClick={increment}>+ Increment</button>
        <button className="btn btn-reset"     onClick={reset}>↺ Reset</button>
        <button className="btn btn-decrement" onClick={decrement}>− Decrement</button>
      </div>
    </div>
  );
}

export default Counter;
