// Import the express module
const express = require('express');
const {sequelize, connectDB} = require('./config/db');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Create an express application instance
const app = express();

//Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'], // Path to your route files
};
// Set the port for the server
const PORT = process.env.PORT || 5000;

//Swagger Spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Middleware
app.use(express.json());

// Main route for the API
app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database synchronization and server start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

/*
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/