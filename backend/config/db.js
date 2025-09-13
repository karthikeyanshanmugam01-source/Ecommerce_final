const { Sequelize } = require('sequelize');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem'));
//const serverCa = fs.readFileSync(path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem'));

/*
const sequelize = new Sequelize(
   "mathi_ecom_db", // process.env.DB_NAME
  "mathi1521@mathi-ecom-gen", // process.env.DB_USER (note: include server domain in username for Azure)
  "Password@123", // process.env.DB_PASSWORD
  {
    host: "mathi-ecom-gen.mysql.database.azure.com", // process.env.DB_HOST
    port: 3306, // Azure MySQL default port is 3306
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        ca: serverCa,
        rejectUnauthorized: true
      }
    }
  }
);  
*/

const sequelize = new Sequelize(
  "mathi_ecom_db",
  "mathi1521",
  "Password@123",
  {
    host: "mathi-ecom-gen.mysql.database.azure.com",
    port: 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true
      }
    }
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