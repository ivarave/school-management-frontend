import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import Darkmode from "../components/Darkmode";
import Sidebar from "../components/Sidebar";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

const role = localStorage.getItem("role");

function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = "/login";
}

function Home() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    moderators: 0,
    gender_ratio: { male: 0, female: 0, other: 0 },
  });
  const [performance, setPerformance] = useState(null);
  const [topStudents, setTopStudents] = useState([]);

  const navigate = useNavigate();

  const linkStudents = () => {
    if (role === "student") {
      navigate("/students");
    } else if (role === "teacher") {
      navigate("/teacher/students");
    } else {
      navigate("/student/subjects");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await api.get("/dashboard/stats/");
        //       const perfRes = await api.get("/subjects/performance/");
        //       const topRes = await api.get("/students/top/");

        setStats(statsRes.data);
        //       setPerformance(perfRes.data);
        //       setTopStudents(topRes.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <Darkmode />
        <header className="header">
          <h1>Dashboard</h1>
        </header>

        <section className="stats">
          <div onClick={linkStudents} className="card clickable">
            <h3>Students</h3>
            <p>{stats.students}</p>
          </div>
          <div className="card">
            <h3>Teachers</h3>
            <p>{stats.teachers}</p>
          </div>
          <div className="card">
            <h3>Moderators</h3>
            <p>{stats.moderators}</p>
          </div>
        </section>

        <section className="charts">
          <div className="chart-box">
            <LineChart />
          </div>
          <div className="chart-box">
            <PieChart genderData={stats.gender_ratio}/>
          </div>
        </section>

        <section className="subjects">
          <h2>Subject Performance</h2>
          {performance ? (
            Object.entries(performance).map(([subject, score]) => (
              <div key={subject} className="progress">
                <span>{subject}</span>
                <div className="bar">
                  <div className="fill" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading performance...</p>
          )}
        </section>

        <section className="top-students">
          <h2>Top Students</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.length > 0 ? (
                topStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.average}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Loading top students...</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Home;
