// Teachers.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import DarkMode from "../components/DarkMode";
import "../styles/teachers.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      const res = await api.get("teachers/"); // Django endpoint
      let data = res.data;

      // Force into array if needed
      if (!Array.isArray(data)) {
        data = [data];
      }

      setTeachers(data);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
      setError("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) return <div>Loading teachers...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <h2>Teachers</h2>
        <DarkMode />

        <table className="teachers-table">
          <thead>
            <tr>
              <th>No</th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Active</th>
              <th>Hired Date</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id || index}>
                <td>{index + 1}</td>
                <td>{teacher.user_id}</td>
                <td>{teacher.first_name}</td>
                <td>{teacher.last_name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone || "-"}</td>
                <td>{teacher.is_active ? "Yes" : "No"}</td>
                <td>{teacher.hired_date}</td>
                <td>
                  {teacher.subjects?.length
                    ? teacher.subjects.join(", ")
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

export default Teachers;
