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
  // Extract query parameters from the request
  const { minPrice, maxPrice, location, minBedrooms } = req.query;

  // Log received filters
  console.log('Received filters:', req.query);

  // Initialize the SQL query and parameter array
  let query = 'SELECT * FROM listings WHERE 1=1';
  const params = [];

  // Apply filters based on query parameters
  if (minPrice) {
    params.push(parseFloat(minPrice)); // Ensure it's treated as a number
    query += ` AND price >= $${params.length}`;
  }

  if (maxPrice) {
    params.push(parseFloat(maxPrice)); // Ensure it's treated as a number
    query += ` AND price <= $${params.length}`;
  }

  if (location) {
    params.push(location); // Assuming location is a string
    query += ` AND location = $${params.length}`;
  }

  if (minBedrooms) {
    params.push(parseInt(minBedrooms)); // Ensure it's treated as an integer
    query += ` AND bedrooms >= $${params.length}`;
  }

  // Log the final query and parameters for debugging
  console.log('Final query:', query);
  console.log('Parameters:', params);

  try {
    // Execute the query with the parameters
    const result = await pool.query(query, params);
    res.json(result.rows); // Return the results as JSON
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});