import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEmployee from "./CreateEmployee";

const AdminDashboard = () => {
  // State for creating employee
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [employeeData, setEmployeeData] = useState({
    email: "",
    password: "",
    name: "",
    role: "EMPLOYEE",
  });

  // State for editing employee
  const [editData, setEditData] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    role: "EMPLOYEE",
  });

  // State for employees list
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
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

  const handleUpdateEmployee = async () => {
    try {
      const updatedData = {
        name: updatedName,
        email: updatedEmail, // Make sure to update this with the password the user wants
        role: updatedRole,
      };

      // Use the selectedEmployee.id dynamically to ensure the correct employee is updated
      await axios.put(
        `http://localhost:5000/api/admin/employee/${selectedEmployee.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(selectedEmployee);
      // alert("Employee updated successfully!");
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee", error);
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
        console.error(
          "Employees data is not in the expected format:",
          response.data
        );
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/employees",
          { headers: { "Content-Type": "application/json" } }
        );

        // Access employees data from response.data.employees
        if (response.data && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          console.error(
            "Employees data is not in the expected format:",
            response.data
          );
          setEmployees([]); // Reset to empty array if data is not in expected format
        }
      } catch (error) {
        console.error("Error fetching employees", error);
        setEmployees([]); // Reset to empty array on error
      }
    };

    fetchEmployees(); // Fetch employees when component mounts
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedName(employee.name);
    setUpdatedEmail(employee.email);
    setUpdatedRole(employee.role);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {/* Create Employee Form */}
      <CreateEmployee />

      <h4 className="mt-5">Employee List</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary ml-2 m-1"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Employee */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title mr-6" id="exampleModalLabel">
                  Edit Employee
                </h5>
                <button
                  type="button"
                  className="close ml-6"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="employeeName">Name</label>
                    <input
                      type="text"
                      id="employeeName"
                      className="form-control"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeeEmail">Email</label>
                    <input
                      type="email"
                      id="employeeEmail"
                      className="form-control"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeeRole">Role</label>
                    <input
                      type="text"
                      id="employeeRole"
                      className="form-control"
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateEmployee}
                >
                  Save Changes
                </button>
              </div>
              <div className="container">
                {/* {error && <p className="text-danger mt-2">{error}</p>}
                {successMessage && (
                  <p className="text-success mt-2">{successMessage}</p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
