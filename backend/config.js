// loadEnv.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'local';
const envFile = path.resolve(__dirname, `.env.${env}`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`Environment file ${envFile} not found.`);
}
