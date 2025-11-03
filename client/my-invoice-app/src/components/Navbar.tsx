import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Don't show navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Invoice Tracker</h2>
      </div>
      <div className="navbar-links">
        <button
          onClick={() => navigate('/')}
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/invoices')}
          className={location.pathname === '/invoices' ? 'active' : ''}
        >
          Invoices
        </button>
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
