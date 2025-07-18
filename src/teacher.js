// src/teachers.js
import React, { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/teacher-info/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Teacher API response:", data); // 👈 check the actual response
        if (Array.isArray(data)) {
          setTeachers(data);
        } else {
          console.error("Unexpected data format:", data);
          setTeachers([]);
        }
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  return (
    <div className="container mt-4">
      
      <h2>Teachers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.first_name}</td>
              <td>{teacher.last_name}</td>
              <td>{teacher.username}</td>
              <td>{teacher.email}</td>
              <td>{teacher.role}</td>
              <td> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
