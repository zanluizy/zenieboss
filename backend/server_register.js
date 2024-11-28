const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'inventory_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Endpoint to handle user registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Failed to register user.');
      return;
    }
    res.status(200).send('User registered successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
