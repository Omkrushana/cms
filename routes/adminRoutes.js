// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

// Admin Login
router.post('/login', adminController.adminLogin);

// Create Employee (Admin only)
router.post('/create-employee', adminController.createEmployee);

// Get Employees (Admin only)
router.get('/employees', adminController.getEmployees);

// Edit Employee (Admin only)
router.put('/employee/:id', adminController.editEmployee);

module.exports = router;
