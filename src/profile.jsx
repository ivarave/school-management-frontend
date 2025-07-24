import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUrl from './utils/api';

const Profile = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully.');
        setOldPassword('');
        setNewPassword('');
      } else {
        setError(data.detail || 'Failed to change password.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Profile</h2>

        <p><strong>Username:</strong> {username}</p>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>First Name:</strong> {first_name}</p>
        <p><strong>Last Name:</strong> {last_name}</p>

        <hr style={{ margin: '20px 0' }} />

        <h3>Change Password</h3>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleChangePassword} style={styles.form}>
          <label style={styles.label}>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Change Password</button>
        </form>

        <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#dc3545', marginTop: 20 }}>
          Logout
        </button>
        
        
          {role === 'teacher' ? (
          <button className="btn btn-secondary mb-3" onClick={() => navigate('/teacher-dashboard')} style={{ ...styles.button, backgroundColor: '#808080',marginTop:10, marginLeft: 10 }}>
            ← Back to Dashboard
          </button>
        ) : role === 'student' ? (
          <button className="btn btn-secondary mb-3" onClick={() => navigate('/student-dashboard')} style={{ ...styles.button, backgroundColor: '#808080',marginTop:10, marginLeft: 10 }}>
            ← Back to Dashboard
          </button>
        ) : null}
        {role === 'moderator' ? (
          <button className="btn btn-secondary mb-3" onClick={() => navigate('/modoption')} style={{ ...styles.button, backgroundColor: '#808080',marginTop:10, marginLeft: 10 }}>
            ← Back to Admin Panel
          </button>
        ) : null}

      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 400,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Profile;
