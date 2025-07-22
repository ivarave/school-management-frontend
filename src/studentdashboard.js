import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiUrl from "./utils/api";

const StudentDashboard = () => {
  const [darkMode] = useState(false);
  const [info, setInfo] = useState({});
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch(`${apiUrl}/api/student-info/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data =>{
        console.log("STUDENT INFO RESPONSE:", data);
        setInfo(data);
  })
      .catch(() => setError('Failed to fetch student info.'));

  }, [token]);

  return (
    <div className={`container-fluid min-vh-100 py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📊 School Management Dashboard</h2>
          <Link to="/profile" className="btn btn-secondary fw-bold">
            Hi, {username} 👋
          </Link>
        </div>

        <h4 className="text-center mb-5">Welcome, <span className="text-tertiary">{username}</span></h4>
        {error && <p className="text-danger">{error}</p>}

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div className="col">
            <div className="card bg-info text-white h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">👤 My Info</h5>
                <p>Email: {info.email || 'Loading...'}</p>
                <p>Class: {info.classroom || 'N/A'}</p>
                <p>Subjects: {(info.subjects || []).join(', ') || 'No subjects yet'}</p>
              </div>
            </div>
          </div>

          <div className="col">
            <Link to="/subjects" className="text-decoration-none">
              <div className="card bg-primary text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">📘 Subjects</h5>
                  <p className="card-text">View your subjects.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/classrooms" className="text-decoration-none">
              <div className="card bg-danger text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">🏫 Classrooms</h5>
                  <p className="card-text">View your classroom arrangement.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/timetable" className="text-decoration-none">
              <div className="card bg-info text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">📅 Timetable</h5>
                  <p className="card-text">View class schedules.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/attendance" className="text-decoration-none">
              <div className="card bg-warning text-dark h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">✅ Attendance</h5>
                  <p className="card-text">Track daily attendance records.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/grades" className="text-decoration-none">
              <div className={`card h-100 shadow ${darkMode ? 'bg-light text-dark' : 'bg-dark text-light border border-light'}`}>
                <div className="card-body text-center">
                  <h5 className="card-title">🏅 Grades</h5>
                  <p className="card-text">View your grades.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
