// Students.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import DarkMode from "../components/DarkMode";
import "../styles/students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await api.get("students/"); // Django endpoint
      let data = res.data;

      if (data.results) {
        data = data.results;
      }

      if (!Array.isArray(data)) {
        data = [data];
      }

      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Failed to load students.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <h2>Students</h2>
        <DarkMode />

        <table className="subjects-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, index) => (
              <tr key={stu.id || index}>
                <td>{index + 1}</td>
                <td>{stu.id}</td>
                <td>{stu.first_name}</td>
                <td>{stu.last_name}</td>
                <td>
                  {stu.subjects?.length
                    ? stu.subjects.join(", ")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </main>
    </div>
  );
}

export default Students;
