
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={{ backgroundColor: '#0073b1', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
      {localStorage.getItem('token') ? (
        <>
          <Link to="/profile/me" style={{ color: 'white', marginRight: '20px' }}>My Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: 'white', marginRight: '20px' }}>Login</Link>
          <Link to="/register" style={{ color: 'white' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
