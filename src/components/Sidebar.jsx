import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const role = localStorage.getItem("role");

function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = "/login";
}

function Sidebar() {
  const navigate = useNavigate();

  const linkStudents = () => {
    if (role === "moderator" || role === "teacher" || role === "student") {
      navigate("/students");
    } else {
      navigate("/logout");
      alert("Login again.");
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">School Admin</h2>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Dashboard</li>
          <li onClick={linkStudents}>Students</li>
          <li onClick={() => navigate("/teachers")}>Teachers</li>
          <li onClick={() => navigate("/subjects")}>Subjects</li>
          <li onClick={() => navigate("/grades")}>Grades</li>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
