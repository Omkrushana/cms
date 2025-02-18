import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleAdminClick = () => {
    navigate("/admin"); // Navigate to admin page
  };

  const handleEmployeeClick = () => {
    navigate("/employee"); // Navigate to employee page
  };

  return (
    <div className="d-flex justify-content-center vh-90 m-5 g-2">
      {/* Admin Login Card */}
      <div className="card" style={{ width: "18rem" }} onClick={handleAdminClick}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-WnN5V2rTKW7-7j_7lM-9m-uqyGbzkXxOGw&s"
          height="200px"
          className="card-img-top"
          alt="Admin"
        />
        <div className="card-body">
          <p className="card-text">Admin Login</p>
        </div>
      </div>

      {/* Employee Login Card */}
      <div className="card" style={{ width: "18rem" }} onClick={handleEmployeeClick}>
        <img
          src="https://st2.depositphotos.com/5312214/10634/i/450/depositphotos_106344344-stock-photo-employee-business-concept-with-text.jpg"
          height="200px"
          className="card-img-top"
          alt="Employee"
        />
        <div className="card-body">
          <p className="card-text">Employee Login</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
