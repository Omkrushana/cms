const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Query the database for the admin user
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result[0];
    console.log(user);

    // Compare passwords using bcrypt
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token for the user
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Return token along with user ID
      res.json({ message: 'Login successful', token, userId: user.id });
    });
  });
};

