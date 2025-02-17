const db = require("../config/db");

// Submit today's task
const createTask = (req, res) => {
  const { employee_id, task_description } = req.body;

  // Validation
  if (!employee_id || !task_description) {
    return res
      .status(400)
      .json({ message: "Employee ID and Task Description are required" });
  }
  const query = `
      INSERT INTO tasks (employee_id, task_description, created_at)
      VALUES (?, ?, NOW())
    `;

  db.query(query, [employee_id, task_description], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating task", err });
    }
    res.status(201).json({ message: "Task created successfully" });
  });
};

// Update task
const updateTask = (req, res) => {
    const { employee_id, task_description } = req.body;

    // Validation
    if (!employee_id || !task_description) {
      return res
        .status(400)
        .json({ message: "Employee ID and Task Description are required" });
    }
    const query = "UPDATE tasks SET task_description = ? WHERE employee_id = ?";
  db.query(query, [task_description,employee_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating task", err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  });
    // db.query(query, [employee_id, task_description], (err, result) => {
    //   if (err) {
    //     return res.status(500).json({ message: "Error creating task", err });
    //   }
    //   res.status(201).json({ message: "Task created successfully" });
    // });
};

module.exports = { createTask,updateTask };
