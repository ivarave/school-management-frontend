import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from './utils/api';


const Subjects = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        const response = await axios.get('http://localhost:8000/api/subjects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(response.data);
      } catch (err) {
        setError('Failed to fetch subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="container py-5">
      {role === 'teacher' ? (
        <button className="btn btn-secondary mb-3" onClick={() => navigate('/teacher-dashboard')}>
          ← Back to Dashboard
        </button>
      ) : role === 'student' ? (
        <button className="btn btn-secondary mb-3" onClick={() => navigate('/student-dashboard')}>
          ← Back to Dashboard
        </button>
      ) : null}
      {role === 'moderator' ? (
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </button>
      ) : null}

      <h2 className="mb-4">📘 Subjects</h2>

      {loading ? (
        <p>Loading subjects...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Subject Name</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subjects;
