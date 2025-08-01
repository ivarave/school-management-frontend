console.log('App loaded');
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import apiUrl from './utils/api';
import Login from './login';
import Register from './register';
import Profile from './profile';
import Students from './student';
import Teachers from './teacher';
import Subjects from './subject';
import Classrooms from './classroom';
import Grades from './grade';
import Timetables from './timetable';
import Attendance from './attendance';
import WaitingApproval from './waitingapproval';
import ModOption from './modOption';
import ModeratorDashboard from './moderatordashboard';
import StudentDashboard from './studentdashboard';
import TeacherDashboard from './teacherdashboard';
import TeachersGrade from './teachersgrade';
import StudentsGrade from './studentsgrade';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/timetable" element={<Timetables />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/waitingapproval" element={<WaitingApproval />} />
        <Route path="/modoption" element={<ModOption />} />
        <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teachersgrade" element={<TeachersGrade />} />
        <Route path="/studentsgrade" element={<StudentsGrade />} />
        <Route path="/grade" element={< Grades />} />


      </Routes>
    </Router>
  );
}

export default App;
