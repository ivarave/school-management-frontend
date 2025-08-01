import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timetables = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

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
      <h2 className="mb-4">📅 Timetable</h2>
      <p>This is where timetable data will be displayed.</p>
    </div>
  );
};

export default Timetables;
    