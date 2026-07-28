import React from 'react';

// 1. Inline CSS — style prop with JS object
function InlineCSS() {
  const boxStyle = {
    backgroundColor: '#e8f5e9',
    border: '2px solid #4caf50',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
  };
  const headingStyle = { color: '#2e7d32', marginBottom: '8px' };
  const paraStyle    = { color: '#555' };

  return (
    <div style={boxStyle}>
      <h2 style={headingStyle}>1. Inline CSS</h2>
      <p style={paraStyle}>This box is styled using the React <code>style</code> prop (JS object).</p>
    </div>
  );
}

export default InlineCSS;
