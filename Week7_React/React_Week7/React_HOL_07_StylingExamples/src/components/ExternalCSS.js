import React from 'react';
// 3. External CSS — imported from a separate .css file
import './ExternalCSS.css';

function ExternalCSS() {
  return (
    <div className="external-box">
      <h2>3. External CSS</h2>
      <p>This box is styled using an external <code>ExternalCSS.css</code> file imported into the component.</p>
    </div>
  );
}

export default ExternalCSS;
