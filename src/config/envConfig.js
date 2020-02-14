const dotenv = require('dotenv');

// set environment variables
const envConfig = () => {
  
  dotenv.config();

  // define url for development
  const protocol = process.env.PROTOCOL || 'http';
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3333;

  process.env.DEV_URL = `${protocol}://${host}:${port}`;

  return port;
}

module.exports = envConfig;