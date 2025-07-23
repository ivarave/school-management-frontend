import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiUrl from './utils/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [finalUsername, setFinalUsername] = useState('');
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFinalUsername('');
    setPending(false);

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    const submissionData = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password1,
      role: formData.role,
    };

    try {
      const response = await fetch(`${apiUrl}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setFinalUsername(data.final_username);

        if (formData.role === 'moderator') {
          setPending(true);
        } else {
          setTimeout(() => navigate('/login', {
            state: {
              prefillUsername: data.final_username,
              successMessage: 'Account created successfully!',
            },
          }), 3000);
        }
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 20 }}>Register</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {finalUsername && !pending && (
          <p style={{ color: 'green' }}>
            Registration successful! Your username is: <strong>{finalUsername}</strong>
          </p>
        )}
        {pending && (
          <p style={{ color: 'orange' }}>
            Registration submitted! Your moderator account <strong>{finalUsername}</strong> is pending approval.
          </p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required style={styles.input} />
          
          <label style={styles.label}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Password:</label>
          <input type="password" name="password1" value={formData.password1} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Confirm Password:</label>
          <input type="password" name="password2" value={formData.password2} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required style={styles.input}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="moderator">Moderator</option>
          </select>

          <button type="submit" style={styles.button}>Register</button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <p><Link to="/login">Already have an account? Login</Link></p>
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

export default Register;
             