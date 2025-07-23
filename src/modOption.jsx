// src/pages/modoption.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModOption = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Administrator Panel</h2>
        <button style={styles.button} onClick={() => navigate('/moderator-dashboard')}>
          Moderator Dashboard
        </button>
        <button style={styles.button} onClick={() => navigate('/student-dashboard')}>
          Student View
        </button>
        <button style={styles.button} onClick={() => navigate('/teacher-dashboard')}>
          Teacher View
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  card: {
    padding: 30,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  button: {
    display: 'block',
    margin: '10px 0',
    padding: 12,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
};

export default ModOption;
