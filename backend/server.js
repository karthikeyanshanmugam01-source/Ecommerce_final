// Import the express module
const express = require('express');
const {connectDB} = require('./config/db');

// Create an express application instance
const app = express();

// Set the port for the server
const port = 5000;

// Define a basic route for the root URL ('/')
app.get('/', (req, res) => {
  connectDB();
  res.send('Welcome to the simple API project!');
});

// Define a second route to return JSON data
app.get('/api/users', (req, res) => {
  // Respond with a JSON array of users
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Peter Jones' }
  ]);
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});