import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [darkMode] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/api/teacher-info/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch teacher info");
        return res.json();
      })
      .then((data) => setInfo(data))
      .catch(() => setError("Failed to load teacher info."));
  }, [token]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <div
      className={`container-fluid min-vh-100 py-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📊 School Management Dashboard</h2>
          <Link to="/profile" className="btn btn-secondary fw-bold">
            Hi, {username} 👋
          </Link>
        </div>

        <h4 className="text-center mb-5">
          Welcome, <span className="text-tertiary">{username}</span>
        </h4>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* My Info Button */}
          <div className="col">
            <button
              className="card bg-light text-dark h-100 shadow border w-100 text-start"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            >
              <div className="card-body text-center">
                <h5 className="card-title">👤 My Info</h5>
                <p className="card-text">Click to view your profile</p>
              </div>
            </button>
          </div>

          {/* Other Feature Cards */}
          <div className="col">
            <Link to="/students" className="text-decoration-none">
              <div className="card bg-secondary text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">📚 Students</h5>
                  <p className="card-text">Manage all registered students.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/teachers" className="text-decoration-none">
              <div className="card bg-success text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">👨‍🏫 Teachers</h5>
                  <p className="card-text">View and update teacher records.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/subjects" className="text-decoration-none">
              <div className="card bg-primary text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">📘 Subjects</h5>
                  <p className="card-text">Explore subjects offered by the school.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/classrooms" className="text-decoration-none">
              <div className="card bg-danger text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">🏫 Classrooms</h5>
                  <p className="card-text">Assign students and teachers to classes.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/timetable" className="text-decoration-none">
              <div className="card bg-info text-white h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">📅 Timetable</h5>
                  <p className="card-text">Manage class schedules and time slots.</p>
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
              <div
                className={`card h-100 shadow ${
                  darkMode
                    ? "bg-light text-dark"
                    : "bg-dark text-light border border-light"
                }`}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">🏅 Grades</h5>
                  <p className="card-text">Enter and view student grades.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Modal (No Close Button, Click Outside to Close) */}
        {showModal && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={handleBackdropClick}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
            >
              <div className="modal-content" ref={modalRef}>
                <div className="modal-body">
                  <h5 className="modal-title mb-3 text-center">👤 My Info</h5>
                  <p>
                    <strong>Username:</strong> {info.username || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {info.email || "N/A"}
                  </p>
                  <p>
                    <strong>Teacher ID:</strong> {info.teacher_id || "N/A"}
                  </p>
 
                  {error && (
                    <div className="alert alert-danger mt-2">{error}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
