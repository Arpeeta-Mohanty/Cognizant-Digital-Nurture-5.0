import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/',         label: '🏠 Home'     },
  { to: '/about',    label: 'ℹ️ About'    },
  { to: '/services', label: '⚙️ Services' },
  { to: '/contact',  label: '📞 Contact'  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">ReactRouter App</div>
      <ul className="nav-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
