import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from './utils/api';


const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();
  


  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/grades/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        if (error.response?.status === 401) navigate('/login');
      }
    };

    const fetchStudents = async () => {
      if (role !== 'teacher', 'moderator','student') {
        try {
          const response = await axios.get(`${apiUrl}/api/students/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/subjects/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchGrades();
    fetchStudents();
    fetchSubjects();
  }, [navigate, role, token]);

  const handleCreateGrade = async (e) => {
    e.preventDefault();

    if (!selectedStudent || !selectedSubject || !score) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/grades/`,
        {
          student: selectedStudent,
          subject: selectedSubject,
          score,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGrades([...grades, response.data]);
      setSelectedStudent('');
      setSelectedSubject('');
      setScore('');
      setError('');
    } catch (err) {
      console.error('Error creating grade:', err);
      setError('Failed to create grade');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Grade Management</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleCreateGrade} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Student:</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {Array.isArray(students) &&
              students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} { student.last_name} - {student.username}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <select
            className="form-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">-- Select Subject --</option>
            {Array.isArray(subjects) &&
              subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Score:</label>
          <input
            type="number"
            className="form-control"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Record
        </button>
      </form>

      <h4>All Grades</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.student_name}</td>
              <td>{grade.subject_name || grade.subject}</td>
              <td>{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherGrades;
