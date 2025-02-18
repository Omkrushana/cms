import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
        navigate("/employee/add-task"); // Redirect after 1 second
      }, 1000);
      localStorage.setItem("token", data.token);
      localStorage.setItem("employee_id", data.userId);
    } else {
      setError(data.message || "Login failed. Please try again.");
    }

    // Reset the form fields after the login attempt
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center vh-90 m-5">
      <div className="card border border-secondary"style={{ width: "40rem",height:"20rem" }}>
        <form onSubmit={handleLogin}>
          <div className="form-group m-5 ">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          {success && <p className="text-success mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginEmployee;
