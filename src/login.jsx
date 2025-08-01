import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import apiUrl from './utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'moderator') {
        navigate('/moderator-dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      }
    }
  }, [navigate]);

  // Prefill username (e.g., from register page redirect)
  useEffect(() => {
    if (location.state?.prefillUsername) {
      setFormData((prev) => ({
        ...prev,
        username: location.state.prefillUsername,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);

        if (data.role === 'moderator') {
          navigate('/moderator-dashboard');
        } else if (data.role === 'student') {
          navigate('/student-dashboard');
        } else if (data.role === 'teacher') {
          navigate('/teacher-dashboard');
        }
      } else {
        if (data.detail === 'Moderator account is pending approval') {
          navigate('/waiting-approval');
        } else {
          setError(data.detail || 'Login failed');
        }
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>

        {location.state?.successMessage && (
          <p style={{ color: 'green' }}>{location.state.successMessage}</p>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <p>
            <Link to="/register">Don't have an account? Register</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
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
    width: 400,
    padding: 30,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    marginBottom: 16,
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

export default Login;
