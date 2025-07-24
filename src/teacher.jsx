import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "./utils/api";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${apiUrl}/api/teachers/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch teachers");
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Fetched teachers payload:", data);
        setTeachers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

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

      <h2 className="mb-4">👩‍🏫 Teachers</h2>

      {loading ? (
        <p>Loading teacher data...</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.first_name || 'N/A'}</td>
                <td>{teacher.last_name || 'N/A'}</td>
                <td>{teacher.teacher_id || 'N/A'}</td>
                <td>{teacher.email || 'N/A'}</td>
                <td>{teacher.role || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teachers;
