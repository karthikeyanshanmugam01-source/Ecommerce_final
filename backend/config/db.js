const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  "ecomlemellows", //process.env.DB_NAME,
  "karthik", //process.env.DB_USER,
  "Password@1", //process.env.DB_PASSWORD,
  {
    host: "127.0.0.1", //process.env.DB_HOST,
    port: "3300", //process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries in the console 
  }
);  

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };