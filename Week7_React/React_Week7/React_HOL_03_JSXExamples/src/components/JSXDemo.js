import React from 'react';
import './JSXDemo.css';

// Helper function used inside JSX
function greet(name) {
  return `Hello, ${name}!`;
}

function JSXDemo() {
  // Variables used inside JSX
  const courseName = 'React 18';
  const batchYear = 2024;
  const isActive = true;

  // Inline style object
  const highlightStyle = {
    backgroundColor: '#fff9c4',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#e65100',
  };

  return (
    // Fragment — avoids extra DOM node
    <>
      {/* 1. JavaScript Expressions inside JSX */}
      <section className="demo-section">
        <h2>1. JavaScript Expressions in JSX</h2>
        <p>2 + 3 = <strong>{2 + 3}</strong></p>
        <p>Current Year: <strong>{new Date().getFullYear()}</strong></p>
        <p>Is Active: <strong>{isActive ? 'Yes' : 'No'}</strong></p>
      </section>

      {/* 2. Variables */}
      <section className="demo-section">
        <h2>2. Variables</h2>
        <p>Course: <strong>{courseName}</strong></p>
        <p>Batch Year: <strong>{batchYear}</strong></p>
      </section>

      {/* 3. Functions */}
      <section className="demo-section">
        <h2>3. Functions</h2>
        <p>{greet('Cognizant Learner')}</p>
      </section>

      {/* 4. Inline Styling */}
      <section className="demo-section">
        <h2>4. Inline Styling</h2>
        <p style={highlightStyle}>This text uses an inline style object.</p>
        <p style={{ color: '#1565c0', fontSize: '1.1rem' }}>Direct inline style on element.</p>
      </section>

      {/* 5. JSX Attributes */}
      <section className="demo-section">
        <h2>5. JSX Attributes</h2>
        {/* className instead of class, htmlFor instead of for */}
        <p className="attr-demo">Using <code>className</code> attribute (not class)</p>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          React Official Docs (href attribute)
        </a>
        <br />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          width="60"
          style={{ marginTop: '10px' }}
        />
      </section>

      {/* 6. Fragments */}
      <section className="demo-section">
        <h2>6. Fragments</h2>
        <p>This entire component is wrapped in a <code>&lt;&gt;...&lt;/&gt;</code> Fragment.</p>
        <p>Fragments avoid adding extra DOM nodes.</p>
      </section>
    </>
  );
}

export default JSXDemo;
