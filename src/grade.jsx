import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from './utils/api';


const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]); // ⭐ new
  const [selectedStudent, setSelectedStudent] = useState('');
  const [newGrade, setNewGrade] = useState({
    subject: '',
    score: '',
    term: '',
    session: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

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
      if (role === 'teacher') {
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

    const fetchSubjects = async () => { // ⭐ new
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

  const handleInputChange = (e) => {
    setNewGrade({
      ...newGrade,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newGrade,
      student: selectedStudent,
    };

    try {
      await axios.post(`${apiUrl}/api/grades/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewGrade({ subject: '', score: '', term: '', session: '' });
      setSelectedStudent('');
      const refreshed = await axios.get(`${apiUrl}/api/grades/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrades(refreshed.data);
    } catch (error) {
      console.error('Error submitting grade:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Grades</h2>

      {role === 'teacher' && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Subject</label>
              <select
                className="form-control"
                name="subject"
                value={newGrade.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-2">
              <label>Score</label>
              <input
                type="number"
                className="form-control"
                name="score"
                value={newGrade.score}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group col-md-2">
              <label>Term</label>
              <input
                type="text"
                className="form-control"
                name="term"
                value={newGrade.term}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group col-md-2">
              <label>Session</label>
              <input
                type="text"
                className="form-control"
                name="session"
                value={newGrade.session}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group col-md-3">
              <label>Student</label>
              <select
                className="form-control"
                value={selectedStudent}
                onChange={handleStudentChange}
                required
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.user?.username || 'Unnamed Student'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Submit Grade
          </button>
        </form>
      )}

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

export default Grade;
