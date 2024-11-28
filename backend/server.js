const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add a new product
app.post('/products', (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const query = 'INSERT INTO products SET ?';
  const values = { name, description, category, price, quantity };
  db.query(query, values, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ id: results.insertId, ...values });
  });
});

// Update an existing product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, quantity } = req.body;
  const query = 'UPDATE products SET ? WHERE id = ?';
  db.query(query, [{ name, description, category, price, quantity }, id], (error) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ id, name, description, category, price, quantity });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, id, (error) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
  });
});

// Fetch all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(results);
  });
});

// Add a new user
app.post('/users', (req, res) => {
  const { username, password, role } = req.body;
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'User registered successfully!', userId: results.insertId });
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful!', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
});

