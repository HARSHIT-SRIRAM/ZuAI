import React, { useState } from "react";
import axios from "axios";
import config from "../../Config/config";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profile_picture: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/users/register`,
        formData
      );
      setSuccess("User registered successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        bio: "",
        profile_picture: "",
        role: "user",
      });
    } catch (error) {
      setError("Error registering user");
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
        <input
          type="text"
          name="profile_picture"
          value={formData.profile_picture}
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
