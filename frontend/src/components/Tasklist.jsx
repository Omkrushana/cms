import axios from "axios";
import React, { useEffect, useState } from "react";

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const employeeId = localStorage.getItem("employee_id"); // Get logged-in employee ID

  useEffect(() => {
    if (!employeeId) {
      console.error("Employee ID not found in localStorage.");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/tasks/${employeeId}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Task data is not in the expected format:", response.data);
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching task", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [employeeId]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setUpdatedDescription(task.task_description);
    setShowModal(true);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/employee/update-task",
        {
          id: selectedTask.id,
          task_description: updatedDescription,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // Update task list with new data
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTask.id ? { ...task, task_description: updatedDescription } : task
          )
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="container-lg mt-4 d-flex row">
      <h4>Task List</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task_description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary ml-2 m-1"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Task Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
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
                  onClick={handleUpdateTask}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasklist;
