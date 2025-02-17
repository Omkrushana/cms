const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('../cmsbackend/config/db');  // Import the database connection
const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcrypt');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes); // Add employee routes

app.use('/api/admin',adminRoutes);

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const createDefaultAdmin = () => {
    db.query('SELECT * FROM users WHERE email = ?', ['admin@example.com'], (err, result) => {
      if (err) {
        console.error('Error checking admin user:', err);
        return;
      }
      if (result.length === 0) {
        // Admin doesn't exist, so create it
        bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            return;
          }
  
          const defaultAdmin = {
            name: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
          };
  
          // Insert the default admin user into the database
          db.query('INSERT INTO users SET ?', defaultAdmin, (err, result) => {
            if (err) {
              console.error('Error creating default admin:', err);
            } else {
              console.log('Default admin created successfully!');
            }
          });
        });
      } else {
        console.log('Admin user already exists.');
      }
    });
  };
  
  // Call the function to check and create the admin user
  createDefaultAdmin();
  
  // Use the routes
  app.use('/api/admin', adminRoutes);
  
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


