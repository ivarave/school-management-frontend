import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/login.css";
import axios from "axios";
import DarkMode from "../components/Darkmode";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", formData);
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      const userRes = await api.get("/register/me/", {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });

      localStorage.setItem("user_id", userRes.data.id);
      localStorage.setItem("username", userRes.data.username);
      localStorage.setItem("role", userRes.data.role);

      if (onLoginSuccess) onLoginSuccess();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your username/password.");
    }
  };

  return (
    <div className="login-container">
      <DarkMode />

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="login-links">
        <Link to="/forgot-password/">Forgot Password?</Link>
        <Link to="/register/">Don’t have an account?Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
