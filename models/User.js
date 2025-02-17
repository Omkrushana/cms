// You can use this as reference for query structure
const db = require('../config/db');

// This isn't an actual ORM model but a representation for clarity
exports.createUser = (userData, callback) => {
  const { name, email, phone, password, role } = userData;
  const query = 'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, password, role], callback);
};
