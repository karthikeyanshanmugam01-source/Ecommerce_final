const { Sequelize } = require("sequelize");
require("../config");

const fs = require("fs");
const path = require("path");

console.log(__dirname);
console.log(path.join(__dirname, "DigiCertGlobalRootCA.crt.pem"));
//const serverCa = fs.readFileSync(path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem'));

const env = process.env.NODE_ENV || 'local';

//Local Host
const sequelize_local = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Azure MySQL default port is 3306
    dialect: "mysql",
  }
);

const sequelize_azureDev = new Sequelize(
  process.env.AZURE_MYSQL_DB,
  process.env.AZURE_MYSQL_USER,
  process.env.AZURE_MYSQL_PWD,
  {
    host: process.env.AZURE_MYSQL_HOST,
    port: process.env.AZURE_MYSQL_PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

const sequelize = env === "local" ? sequelize_local : sequelize_azureDev;
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
