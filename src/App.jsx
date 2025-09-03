import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import './styles/login.css';
import DarkMode from './components/DarkMode.jsx'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Subjects from "./pages/Subjects.jsx"
import Students from "./pages/Students.jsx"
import Teachers from "./pages/Teachers.jsx"
import Grades from "./pages/Grades.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login route="/users/token/" />} />
        <Route path="/register" element={<Register route="/users/register/" />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/grades" element={<Grades />} />
        
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;