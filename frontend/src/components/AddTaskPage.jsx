import React, { useState } from "react";
import Tasklist from "./Tasklist";

const AddTaskPage = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const employeeId = localStorage.getItem("employee_id"); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employeeId+" employee if local");
    
    if (!employeeId) {
      console.error("Employee ID not found in localStorage.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/employee/create-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee_id: localStorage.getItem("employee_id"),
            task_description: taskDescription,
          }),
        }
      );



      const data = await response.json();
      console.log(data+" data got from api task ");
      
      if (response.ok) {
        setSuccess("Task created successfully!");
        setError("");
        setTaskDescription(""); // Clear the input field
      } else {
        setError(data.message || "Failed to create task.");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="row d-flex justify-content-center vh-90 m-5">
      <div className="col-md-3 card border border-secondary" style={{ width: "20rem" }}>
        <div className="card-body">
          <img
            src="https://previews.123rf.com/images/madmaxer/madmaxer1009/madmaxer100900085/7744540-3d-illustration-of-text-task-and-checkmark-completed-task-concept.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body p-3">
            <h5 className="card-title">Add Task</h5>
            <div className="form-group">
              <label htmlFor="taskDescription">Task</label>
              <input
                type="text"
                className="form-control"
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-5"
              onClick={handleSubmit}
            >
              Submit
            </button>

            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </div>
        </div>
      </div>
      <div className="col-md-5">

      <Tasklist/>
      </div>
    </div>
  );
};

export default AddTaskPage;
