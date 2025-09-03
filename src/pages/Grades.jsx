import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Darkmode from "../components/Darkmode";
import "../styles/grades.css";

function Grades() {
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
        <Darkmode/>
        <h2>Grades</h2>

   

      </main>
    </div>
  );
}

export default Grades;
