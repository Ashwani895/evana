import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://evana-spk5.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Login response data:", data);

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Token stored:", data.token);
        }
        if (data.user) {
          if (data.user.name) {
            localStorage.setItem("username", data.user.name);
            console.log("Username stored:", data.user.name);
          }
          if (data.user.role) {
            localStorage.setItem("role", data.user.role);
            console.log("Role stored:", data.user.role);
          }
        }
        // Reload to update navbar or other state depending on login
        window.location.reload();
      } else {
        setMessage(data.message || "Login failed ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4">Welcome Back 👋</h3>
        {message && (
          <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
