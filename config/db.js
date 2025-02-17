const mysql = require('mysql2');
require('dotenv').config(); // Ensure to load environment variables

// Create a connection to the database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
