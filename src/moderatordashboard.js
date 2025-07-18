// src/moderatordashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModeratorDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ username: '', email: '', role: '' });
  const [actionRow, setActionRow] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in again.');
      navigate('/login');
      return;
    }

    fetch('http://localhost:8000/api/manage-users/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError('Invalid response format');
          console.log('API response:', data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load users.');
      });
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:8000/api/manage-users/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      setActionRow(null);
    });
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        alert('User created successfully');
        setUsers([...users, data]);
        setNewUser({ username: '', email: '', password: '', role: 'student' });
        setShowForm(false);
      } else {
        alert(data.error || 'Error creating user');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditedData({
      username: user.username,
      email: user.email,
      role: user.role
    });
    setActionRow(user.id);
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    fetch(`http://localhost:8000/api/manage-users/${editingUser}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (data.email) {
            alert(`Email error: ${data.email.join(', ')}`);
          } else if (data.username) {
            alert(`Username error: ${data.username.join(', ')}`);
          } else {
            alert('Failed to update user.');
          }
          return;
        }

        setUsers(users.map((u) => (u.id === editingUser ? data : u)));
        setEditingUser(null);
        setEditedData({ username: '', email: '', role: '' });
        setActionRow(null);
      })
      .catch((err) => {
        console.error(err);
        alert('Network error: Failed to update user');
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Moderator Dashboard</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: showForm ? '#dc3545' : '#28a745',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {showForm ? 'Cancel' : 'Create New User'}
      </button>

      <button
        onClick={() => navigate('/modOption')}
        style={{
          marginLeft: '550px',
          backgroundColor: '#808080',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        Back to Admin Panel
      </button>

      {showForm && (
        <form onSubmit={createUser} style={styles.form}>
          <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleNewUserChange} required />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleNewUserChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleNewUserChange} required />
          <select name="role" value={newUser.role} onChange={handleNewUserChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="moderator">Moderator</option>
          </select>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={styles.td}>{u.id}</td>
              <td style={styles.td}>
                {editingUser === u.id ? (
                  <input type="text" name="username" value={editedData.username} onChange={handleEditChange} />
                ) : (
                  u.username
                )}
              </td>
              <td style={styles.td}>
                {editingUser === u.id ? (
                  <input type="email" name="email" value={editedData.email} onChange={handleEditChange} />
                ) : (
                  u.email
                )}
              </td>
              <td style={styles.td}>
                {editingUser === u.id ? (
                  <select name="role" value={editedData.role} onChange={handleEditChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="moderator">Moderator</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>
              <td style={styles.td}>
                {actionRow === u.id ? (
                  <>
                    {editingUser === u.id ? (
                      <>
                        <button onClick={updateUser} style={styles.updateBtn}>Update</button>
                        <button onClick={() => { setEditingUser(null); setActionRow(null); }} style={styles.cancelBtn}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(u)} style={styles.updateBtn}>Edit</button>
                        <button onClick={() => deleteUser(u.id)} style={styles.deleteBtn}>Delete</button>
                        <button onClick={() => setActionRow(null)} style={styles.cancelBtn}>Back</button>
                      </>
                    )}
                  </>
                ) : (
                  <button onClick={() => setActionRow(u.id)} style={styles.editBtn}>Actions</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '2rem',
    backgroundColor: '#fff',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  headerRow: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  th: {
    padding: '10px',
    border: '1px solid #ccc',
  },
  td: {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    marginLeft: '4px',
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  updateBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
};

export default ModeratorDashboard;
