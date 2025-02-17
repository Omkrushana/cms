const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const taskContraoler = require('../controllers/taskController');

// POST route for submitting today's task
// Create a task for the employee
router.post('/create-task', employeeController.createTask);
router.put('/update-task', employeeController.updateTask);
router.get('/tasks', taskContraoler.getTasks);
router.get('/tasks/:employeeId', taskContraoler.getTasksByEmployee);

module.exports = router;
