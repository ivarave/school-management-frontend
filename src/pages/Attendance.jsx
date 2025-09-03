import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import "../styles/attendance.css";

function Attendance() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");


  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <h2>Attendance</h2>

   

      </main>
    </div>
  );
}

export default Attendance;
