import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "./utils/api";

const TeacherDashboard = () => {
  const [info, setInfo] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      setError("No token found.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/teacher-info/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch teacher info.");
        return res.json();
      })
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch teacher info.');
        setLoading(false);
      });
  }, [token]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleModOption = () => {
    navigate('/moderator-dashboard');
  };

  return (
    <div className="container-fluid min-vh-100 py-5 bg-light text-dark">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold"> Teacher Dashboard</h2>
          <div>
            <Link to="/profile" className="btn btn-outline-dark fw-bold me-2">
              Hi, {username} 👋
            </Link>
            {username.startsWith('MOD') && (
              <button onClick={handleModOption} className="btn btn-outline-primary fw-bold me-2">
                Admin Panel
              </button>
            )}
            <button onClick={handleLogout} className="btn btn-outline-danger fw-bold">
              Logout
            </button>
          </div>
        </div>

        <h4 className="text-center mb-5">
          Welcome, <span className="text-primary">{username}</span>
        </h4>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Dashboard Cards */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* My Info Button */}
          <div className="col">
            <button
              className="card bg-info text-white h-100 shadow border-0 w-100 text-start"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            >
              <div className="card-body text-center">
                <h5 className="card-title">👤 My Info</h5>
                <p className="card-text">Click to view your details</p>
              </div>
            </button>
          </div>

          {[
            { path: "/students", title: "👥 Students", text: "Manage student records.", color: "primary" },
            { path: "/teachers", title: "👨‍🏫 Teachers  ", text: "View teacher records.", color: "primary" },
            
            { path: "/subjects", title: "📚 Subjects", text: "Manage subject assignments.", color: "success" },
            { path: "/classrooms", title: "🏫 Classrooms", text: "View classroom setups.", color: "danger" },
            { path: "/timetable", title: "📆 Timetable", text: "Edit schedule.", color: "warning", textColor: "text-dark" },
            { path: "/attendance", title: "✅ Attendance", text: "Record attendance.", color: "info" },
            { path: "/teachersgrade", title: "📊 Grades", text: "Assign and view grades.", color: "dark", textColor: "text-light" },
          ].map(({ path, title, text, color, textColor = "text-white" }, idx) => (
            <div className="col" key={idx}>
              <Link to={path} className="text-decoration-none">
                <div className={`card bg-${color} ${textColor} h-100 shadow`}>
                  <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={handleBackdropClick}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content p-4" ref={modalRef}>
                <h5 className="modal-title mb-3 text-center fw-bold">👤 My Info</h5>
                {loading ? (
                  <div className="text-center py-3">Loading...</div>
                ) : (
                  <>
                    <p><strong>Username:</strong> {info.username || 'N/A'}</p>
                    <p><strong>Email:</strong> {info.email || 'N/A'}</p>
                    {info.department && (
                      <p><strong>Department:</strong> {info.department}</p>
                    )}
                    {info.courses && info.courses.length > 0 && (
                      <p><strong>Courses:</strong> {info.courses.join(", ")}</p>
                    )}
                    {info.role === 'moderator' && (
                      <p><strong>Role:</strong> Moderator</p>
                    )}
                  </>
                )}
                {error && <div className="alert alert-danger mt-2">{error}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
