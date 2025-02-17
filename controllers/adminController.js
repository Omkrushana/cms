// Create an Employee (Admin only)
const createEmployee = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  const newEmployee = { name, email, password: hashedPassword, role };

  // Insert employee into database
  db.query('INSERT INTO users SET ?', newEmployee, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating employee', err });
    res.status(201).json({ message: 'Employee created successfully', userId: result.insertId });
  });
};

// Get All Employees (Admin only)
const getEmployees = (req, res) => {
  db.query('SELECT id, name, email, role FROM users WHERE role = "employee"', (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching employees', err });
    res.status(200).json({ employees: result });
  });
};

// Edit an Employee (Admin only)
const editEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  // Validate input fields
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required' });
  }

  // Update the employee in the database
  db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id], (err, result) => {
    if (err) {
      console.error(`Error updating employee with ID ${id}:`, err);
      return res.status(500).json({ message: 'Error updating employee', err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  });
};

const db = require('../config/db'); // Adjust path to your db connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login controller function
const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Query the database for the admin user
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const user = result[0];

    // Compare passwords using bcrypt
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token for the user
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ message: 'Login successful', token });
    });
  });
};

module.exports = { adminLogin,getEmployees,editEmployee,createEmployee };
