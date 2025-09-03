import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import DarkMode from "../components/DarkMode";
import "../styles/teachers.css";

function Teachers() {
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
        <DarkMode/>
        <h2>Teachers</h2>
        <table className="subjects-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last name</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Teachers;
