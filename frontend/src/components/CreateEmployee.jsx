import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    email: "",
    password: "",
    name: "",
    role: "EMPLOYEE",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  // State for employees list
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live validation on input change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    if (name === "email") {
      errors.email = /^\S+@\S+\.\S+$/.test(value)
        ? ""
        : "Please enter a valid email address.";
    }

    if (name === "password") {
      errors.password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&;*\-]).{8,}$/.test(value)
        ? ""
        : "Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }

    if (name === "name") {
      errors.name = value.length >= 3 ? "" : "Name must be at least 3 characters long.";
    }

    setFormErrors(errors);
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    validateField("email", employeeData.email);
    validateField("password", employeeData.password);
    validateField("name", employeeData.name);

    // Check if any errors exist
    if (Object.values(formErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/create-employee",
        employeeData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Employee created successfully!");
      setEmployeeData({
        email: "",
        password: "",
        name: "",
        role: "EMPLOYEE",
      });

      fetchEmployees(); // Fetch updated employee list
    } catch (error) {
      console.error("Error creating employee", error);
      alert("Failed to create employee");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/employees",
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else {
        console.error("Employees data is not in the expected format:", response.data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container-sm ">
      {/* Create Employee Form */}
      <h4>Create Employee</h4>
      <form onSubmit={handleCreateEmployee}>
        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
          {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={employeeData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
          {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
          {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
        </div>

        {/* Role Field */}
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
