import React from 'react';
// 4. CSS Modules — scoped class names, no global conflicts
import styles from './CSSModuleDemo.module.css';

function CSSModuleDemo() {
  return (
    <div className={styles.moduleBox}>
      <h2 className={styles.heading}>4. CSS Modules</h2>
      <p className={styles.para}>
        This box uses a <code>.module.css</code> file. Class names are locally scoped — no global conflicts.
      </p>
      <span className={styles.badge}>Scoped!</span>
    </div>
  );
}

export default CSSModuleDemo;
