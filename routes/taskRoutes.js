const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Public route for creating a task (only admins or managers can do this)
router.post('/', authMiddleware, taskController.createTask);

// Route for getting all tasks (Admin/Manager)
router.get('/', authMiddleware, taskController.getTasks);

// Route for getting tasks by employee ID
router.get('/:employeeId', authMiddleware, taskController.getTasksByEmployee);

// Route for updating task status
router.put('/:taskId/status', authMiddleware, taskController.updateTaskStatus);

module.exports = router;
