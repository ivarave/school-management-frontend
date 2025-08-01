import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    height: '100vh',
    width: '200px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#343a40',
    padding: '20px 10px',
    color: 'white'
  };

  const linkStyle = {
    display: 'block',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 0',
    margin: '10px 0',
    borderBottom: '1px solid #495057'
  };

  return (
    <div style={sidebarStyle}>
      <h3>My Sidebar</h3>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/students" style={linkStyle}>Students</Link>
      <Link to="/teachers" style={linkStyle}>Teachers</Link>
      <Link to="/subjects" style={linkStyle}>Subjects</Link>
      <Link to="/grades" style={linkStyle}>Grades</Link>
      <Link to="/logout" style={linkStyle}>Logout</Link>
    </div>
  );
};

export default Sidebar;
