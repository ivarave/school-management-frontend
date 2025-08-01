import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from './utils/api';


const Classrooms = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/classrooms/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassrooms(response.data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
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
      ) : role === 'moderator' ? (
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </button>
      ) : null}

      <h2 className="mb-4">🏫 Classrooms</h2>

      {classrooms.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Assigned Teacher</th>
                <th>Assigned Teacher ID</th>
                </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.id}>
                  <td>{classroom.id}</td>
                  <td>{classroom.name}</td>
                  <td>{classroom.capacity || 'Unknown'}</td>
                  <td>{classroom.assigned_teacher_name || 'Unassigned'}</td>
                  <td>{classroom.assigned_teacher_id || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No classrooms found.</p>
      )}
    </div>
  );
};

export default Classrooms;
