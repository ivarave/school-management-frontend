//subjects.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import DarkMode from "../components/DarkMode";
import "../styles/subjects.css";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const userId = parseInt(localStorage.getItem("user_id"));

  const [newSubject, setNewSubject] = useState({
    code: "",
    name: "",
    user_id: "",
  });

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects/");
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setSubjects(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      console.log(error);
      alert(" tch subjects");
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get("teachers/");
      console.log("Teachers API response:", res.data);

      const data = res.data.results ? res.data.results : res.data;
      setTeachers(data);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    if (role === "moderator") fetchTeachers();
  }, []);

  const enroll = async (id) => {
    try {
      await api.post(`subjects/${id}/enroll/`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Failed to enroll");
    }
  };

  const unenroll = async (id) => {
    try {
      await api.post(`subjects/${id}/unenroll/`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Failed to unenroll");
    }
  };

  const createSubject = async () => {
    if (!newSubject.name || (role === "moderator" && !newSubject.user_id)) {
      alert("Please enter a subject name and select a teacher.");
      return;
    }

    try {
      const payload = {
        code: newSubject.code,
        name: newSubject.name,
        teacher: newSubject.user_id || null,
      };
      // <-- Add this line to debug
      console.log("Creating subject with payload:", payload);

      const res = await api.post("subjects/", payload);
      console.log("Subject created:", res.data);
      // alert(`Subject "${res.data.name}" created successfully!`);

      setNewSubject({
        code: "",
        name: "",
        user_id: "",
      });

      fetchSubjects();
    } catch (error) {
      console.error("Error creating subject:", error);
      if (error.response) {
        console.error("Backend error response:", error.response.data);

        alert(
          `Failed to create subject: ${JSON.stringify(error.response.data)}`
        );
      } else {
        alert("Failed to create subject. Check console for details.");
      }
    }
  };

  const updateSubject = async (id, updated) => {
    try {
      await api.put(`subjects/${id}/`, updated);
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Failed to update subject");
    }
  };

  const deleteSubject = async (id) => {
    try {
      await api.delete(`subjects/${id}/`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete subject");
    }
  };

  if (loading) return <div>Loading subjects...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <DarkMode />
        <h2>Subjects</h2>

        {/* Teacher/Moderator Section */}
        {(role === "teacher" || role === "moderator") && (
          <div className="subject-form">
            <input
              type="text"
              placeholder="Code"
              value={newSubject.code}
              onChange={(e) =>
                setNewSubject({ ...newSubject, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
            />

            {role === "moderator" && (
              <select
                value={newSubject.user_id || ""}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    user_id: parseInt(e.target.value),
                  })
                }
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.user_id}>
                    {t.first_name} {t.last_name}
                  </option>
                ))}
              </select>
            )}

            <button className="subjects-button enroll" onClick={createSubject}>
              Add Subject
            </button>
          </div>
        )}

        {/* Teacher/Moderator Table */}
        {(role === "teacher" || role === "moderator") && (
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => {
                const canEdit =
                  (role === "teacher" && sub.teacher_name === username) ||
                  role === "moderator";

                return (
                  <tr key={sub.id}>
                    <td>{sub.code}</td>
                    <td>{sub.name}</td>
                    <td>{sub.teacher_name || "-"}</td>
                    <td>{sub.student_names.join(", ")}</td>
                    <td className="actions">
                      {canEdit && (
                        <>
                          <button
                            className="subjects-button enroll"
                            onClick={() => {
                              const updatedSubject = {
                                name: sub.name,
                                code: sub.code,
                                teacher_id: sub.teacher_id || null,
                              };
                              updateSubject(sub.id, updatedSubject);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="subjects-button unenroll"
                            onClick={() => deleteSubject(sub.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Student Section */}
        {role === "student" && (
          <>
            <h3>My Subjects</h3>
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects
                  .filter(sub => sub.students.includes(userId))
                  .map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.code}</td>
                      <td>{sub.name}</td>
                      <td>{sub.teacher_name || "-"}</td>
                      <td>
                        <button
                          className="subjects-button unenroll"
                          onClick={() => unenroll(sub.id)}
                        >
                          Unenroll
                        </button>
                      </td>
                    </tr>
                  ))}
                {subjects.filter(sub => sub.students.includes(userId)).length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      You are not enrolled in any subjects yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3>All Subjects</h3>
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects
                  .filter(sub => !sub.students.includes(userId))
                  .map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.code}</td>
                      <td>{sub.name}</td>
                      <td>{sub.teacher_name || "-"}</td>
                      <td>
                        <button
                          className="subjects-button enroll"
                          onClick={() => enroll(sub.id)}
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))}
                {subjects.filter(sub => !sub.students.includes(userId)).length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No subjects available to enroll.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

      </main>
    </div>
  );
}

export default Subjects;
