const { Pool } = require('pg');
const express = require('express');
const app = express(); // Initialize the app
const cors = require('cors');
app.use(cors());
const port = 5000;
require('dotenv').config();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Database connection pool configuration
const pool = new Pool({
  user: process.env.DB_USER, // Replace with your database username
  host: process.env.DB_HOST, // Replace with your host (localhost if local)
  database: process.env.DB_DATABASE, // Replace with your database name
  password: process.env.DB_PASSWORD, // Replace with your database password
  port: process.env.DB_PORT, // Default PostgreSQL port
});

// Check the database connection
pool.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Failed to connect to the database:", err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get all listings with optional filters
app.get('/listings', async (req, res) => {
  const { min_price, max_price, location, bedrooms } = req.query;

  let query = 'SELECT * FROM listings WHERE 1=1';
  const params = [];

  if (min_price) {
    params.push(min_price);
    query += ` AND price >= $${params.length}`;
  }
  if (max_price) {
    params.push(max_price);
    query += ` AND price <= $${params.length}`;
  }
  if (location) {
    params.push(location);
    query += ` AND location = $${params.length}`;
  }
  if (bedrooms) {
    params.push(bedrooms);
    query += ` AND bedrooms >= $${params.length}`;
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Itnternal server error' });
  }
});