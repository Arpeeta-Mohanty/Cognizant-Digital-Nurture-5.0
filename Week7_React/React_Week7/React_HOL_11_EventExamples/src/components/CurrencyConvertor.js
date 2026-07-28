import React, { useState } from 'react';
import './CurrencyConvertor.css';

// 1 INR = 0.011 EUR (approximate)
const INR_TO_EUR = 0.011;

function CurrencyConvertor() {
  const [inr, setInr]   = useState('');
  const [euro, setEuro] = useState(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setInr(val);
    setEuro(val ? (parseFloat(val) * INR_TO_EUR).toFixed(4) : null);
  };

  return (
    <div className="convertor-card">
      <h2>💱 Currency Convertor — INR to Euro</h2>
      <div className="input-row">
        <input
          type="number"
          placeholder="Enter amount in INR (₹)"
          value={inr}
          onChange={handleChange}
          min="0"
        />
      </div>
      {euro !== null && (
        <div className="result">
          <span className="inr">₹ {parseFloat(inr).toLocaleString('en-IN')}</span>
          <span className="arrow"> → </span>
          <span className="eur">€ {euro}</span>
        </div>
      )}
      <p className="rate-note">Rate: 1 INR = {INR_TO_EUR} EUR</p>
    </div>
  );
}

export default CurrencyConvertor;
