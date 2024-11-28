// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',         // Typically 'localhost' for phpMyAdmin
  user: 'root',              // Default user for local phpMyAdmin (adjust as needed)
  password: '',              // Leave empty if no password is set in phpMyAdmin
  database: 'inventory_db',  // Use the database you create in phpMyAdmin
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database via phpMyAdmin!');
});

module.exports = connection;
