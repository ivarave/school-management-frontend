import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from './utils/api';


const ModOption = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  const username = localStorage.getItem('username');

  return (
    <div className="container-fluid min-vh-100 py-5 bg-light text-dark">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold"> Administrator Panel</h2>
          <div>
            <Link to="/profile " className="btn btn-outline-secondary fw-bold me-2">
              Hi, {username}👋
            </Link>
            <button  onClick={() => navigate('/moderator-dashboard')} className= "btn btn-outline-secondary fw-bold me-2">
              Moderator Dashboard
            </button>
            <button  onClick={() => navigate('/student-dashboard')}className= "btn btn-outline-secondary fw-bold me-2">
              Student View
            </button>
            <button  onClick={() => navigate('/teacher-dashboard')} className= "btn btn-outline-secondary fw-bold me-2">
              Teacher View
            </button>
            <button onClick={handleLogout} className="btn btn-outline-danger fw-bold">
              Logout
            </button>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row justify-content-center gap-3">
            {[
              { path: "/moderator-dashboard", title: "Moderator", color: "primary" },
              { path: "/student-dashboard", title: "Student", color: "primary" },
              { path: "/teacher-dashboard", title: "Teacher", color: "primary" },
            ].map(({ path, title, color, textColor = "text-white" }, idx) => (
              <div className="col-md-3 col-sm-6" key={idx}>
                <Link to={path} className="text-decoration-none">
                  <div className={`card bg-${color} ${textColor} h-100 shadow`}>
                    <div className="card-body text-center">
                      <h5 className="card-title">{title}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
      
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    minwidth: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  card: {
    padding: 70,
    background: '#fff',
    borderRadius: 10,
    boxShadow: '10px 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  button: {
    display: 'block',
    margin: '10px 0',
    padding: 12,
    backgroundColor: '#007bff',
    color: '#fff',
    // color: '#fff',
    // border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    width: '50%',
    fontWeight: 'bold',
  },
};

export default ModOption;
