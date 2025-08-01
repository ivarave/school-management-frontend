import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from './utils/api';


const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/grades/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Student Grades API Response:", response.data);
        // Adjust based on response format (array or object with key `grades`)
        setGrades(Array.isArray(response.data) ? response.data : response.data.grades || []);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setError('Failed to load grades.');
        if (error.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [token, navigate]);

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">My Grades</h2>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Subject</th>
            <th>Score</th>
            <th>Grade Letter</th>
            <th>Remarks</th>
            <th>Term</th>
            <th>Session</th>
          </tr>
        </thead>
        <tbody>
          {grades.length > 0 ? (
            grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.subject_name || grade.subject?.name || 'N/A'}</td>
                <td>{grade.score}</td>
                <td>{grade.grade_letter}</td>
                <td>{grade.remarks}</td>
                <td>{grade.term}</td>
                <td>{grade.session}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No grades found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
