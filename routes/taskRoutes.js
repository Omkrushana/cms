const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');


// Route for getting all tasks (Admin/Manager)
router.get('/', authMiddleware, taskController.getTasks);

// Route for getting tasks by employee ID
router.get('/:employeeId', authMiddleware, taskController.getTasksByEmployee);



module.exports = router;
