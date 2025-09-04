import React, { useState, useEffect } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import DarkMode from "../components/DarkMode";
import "../styles/grades.css";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const role = localStorage.getItem("role"); 

  const fetchData = async () => {
    try {
      const resGrades = await api.get("grades/");
      setGrades(resGrades.data);

      if (role === "teacher") {
        const resStudents = await api.get("students/");
        setStudents(resStudents.data);
        const resSubjects = await api.get("subjects/");
        setSubjects(resSubjects.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      await api.post("grades/", {
        student: selectedStudent,
        subject: selectedSubject,
        score: parseFloat(score),
      });
      fetchData();
      setScore("");
      setSelectedStudent("");
      setSelectedSubject("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading grades...</div>;

  // Helper function to convert score to letter grade
  const getGrade = (score) => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";
    return "F";
  };

  // Helper function for remarks
  const getRemarks = (score) => {
    if (score >= 70) return "Excellent";
    if (score >= 60) return "Very Good";
    if (score >= 50) return "Good";
    if (score >= 40) return "Pass";
    return "Fail";
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <h2>Grades</h2>
        <DarkMode />

        {role === "teacher" && (
        <div className="grade-form">
          <form onSubmit={handleAddGrade}>
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
              <option value="">Select Student</option>
              {students.map((stu) => (
                <option key={stu.id} value={stu.id}>
                  {stu.first_name} {stu.last_name}
                </option>
              ))}
            </select>

            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              step="0.01"
              required
            />
            <button className="grade-button enroll" type="submit">Add Grade</button>
          </form>
        </div>
        )}

        <table className="grade-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => (
              <tr key={g.id}>
                <td>{index + 1}</td>
                <td>{g.student_name}</td>
                <td>{g.subject_name}</td>
                <td>{g.score}</td>
                <td>{getGrade(g.score)}</td>
                <td>{getRemarks(g.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Grades;
