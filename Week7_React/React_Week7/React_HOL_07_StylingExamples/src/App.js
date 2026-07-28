import React from 'react';
import InlineCSS from './components/InlineCSS';
import ExternalCSS from './components/ExternalCSS';
import CSSModuleDemo from './components/CSSModuleDemo';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="main-title">React Styling — HOL 07</h1>

      {/* 1. Inline CSS */}
      <InlineCSS />

      {/* 2. Internal CSS — defined in public/index.html <style> tag */}
      <div className="internal-css-box">
        <h2>2. Internal CSS</h2>
        <p>This box is styled using a &lt;style&gt; tag inside public/index.html (Internal CSS).</p>
      </div>

      {/* 3. External CSS */}
      <ExternalCSS />

      {/* 4. CSS Modules */}
      <CSSModuleDemo />
    </div>
  );
}

export default App;
