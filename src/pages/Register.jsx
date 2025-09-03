import { useState, useEffect, use } from "react";
import api from "../api";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";


function Register(){
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    username: ""
  });

  useEffect(() =>{
    const {first_name, last_name} = formData;
    if (first_name && last_name){
      setFormData(prevData => ({
        ...prevData,
        username:`${last_name.toLowerCase()}.${first_name.toLowerCase()}`
      }));
    }else{
      setFormData(prevData => ({...prevData, username: ""}));
    }
  }, [formData.first_name, formData.last_name]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData( prev => ({...prev,[name]: value}));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const payload = {...formData};
      await api.post("/register/", payload);
      alert("Registration successful!");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        username: ""
      });
      navigate("/login/");

    }catch (error) {
      if (error.response) {
        console.error("Server response:", error.response.data);
        alert("Registration failed: " + JSON.stringify(error.response.data));
      } else {
        console.error(error);
        alert("Registration failed. Please try again.");
      }
    }

  };

  return(
    <div className="register-container">
      <Darkmode/>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="first_name" value={formData.first_name} placeholder="First Name" onChange={handleChange} required />
        </label>
        <br />
        <label>
          <input type="text" name="last_name" value={formData.last_name} placeholder="Last Name" onChange={handleChange} required />
        </label>
        <br />
        <label>
          <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
        </label>
        <br />
          <label>
          <select name="role" value={formData.role} onChange={handleChange} required >
            <option value="">-- Select Role --</option>   
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="moderator">Moderator</option>
          </select>
        </label>
        <br />
        <label>
          <input type="text" name="username" value={formData.username} placeholder="Username" readOnly />
        </label>
        <br />
        <label>
          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
        </label>
        <br />
        <button type ="submit">Register</button>
      </form>
      <div className="register-links">
        <Link to="/login/">
          Already have an account? Log in
        </Link>

      </div>
    </div>
  )
}
export default Register;

