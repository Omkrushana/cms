const db = require('../config/db');

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, dueDate, assignedTo, status } = req.body;

  // Input validation
  if (!title || !description || !dueDate || !assignedTo) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO tasks (title, description, dueDate, assignedTo, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, dueDate, assignedTo, status], (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ message: 'Error creating task' });
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

// Get all tasks (optional: can be filtered by user/role)
const getTasks = (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      return res.status(500).json({ message: 'Error retrieving tasks' });
    }
    res.status(200).json(results);
  });
};

// Get tasks by employee ID
const getTasksByEmployee = (req, res) => {
  const { employeeId } = req.params;

  // Validate employeeId
  if (!employeeId || isNaN(employeeId)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  const query = 'SELECT * FROM tasks WHERE employee_id = ?';
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error retrieving tasks for employee:', err);
      return res.status(500).json({ message: 'Error retrieving tasks' });
    }

    if (results.length === 0) {
      return res.status(200).json([]); // Return empty array if no tasks found
    }

    res.status(200).json(results);
  });
};

module.exports = {getTasks,getTasksByEmployee}